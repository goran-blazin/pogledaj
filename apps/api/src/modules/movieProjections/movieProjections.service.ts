import {ForbiddenException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {CreateMovieProjectionDto} from './dto/createMovieProjection.dto';
import {MovieProjectionFilters, MovieProjectionOptions} from './movieProjections.types';
import {DateTime} from 'ts-luxon';
import {AdminRole, Cinema, CinemaTheater, CurrencyCode, Movie, MovieProjection} from '@prisma/client';
import _ from 'lodash';
import {Logger} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common/exceptions/not-found.exception';
import {AdminUserSafe, GetListOptions, ReturnList} from '../../types/CommonTypes';
import AuthHelper from '../../helpers/Auth.helper';
import {FORBIDDEN_MESSAGE} from '@nestjs/core/guards';
import {forEachAwait, getRandomInt} from '../../helpers/Utils';
import {EditMovieProjectionDto} from './dto/editMovieProjection.dto';
import {getOverlappingProjections} from '.prisma/client/sql/getOverlappingProjections';
import {CreateBulkMovieProjectionDto} from './dto/createBulkMovieProjection.dto';

const RESERVATION_TIME_OFFSET_MINUTES = 30;

export const excludeArchivedMovieProjectionsQuery = () => {
  return {
    gt: DateTime.now().plus({minute: RESERVATION_TIME_OFFSET_MINUTES}).toJSDate(),
  };
};

const generateProjections = (
  cinema: Cinema & {cinemaTheaters: CinemaTheater[]},
  movie: Movie,
  daysCount: number,
): CreateMovieProjectionDto[] => {
  const cinemaTheaterId = _.sample(cinema.cinemaTheaters)?.id;

  if (!cinemaTheaterId) {
    return [];
  }

  // generate 4 times in next two weeks
  const now = DateTime.now();
  const today = DateTime.fromObject({
    year: now.year,
    month: now.month,
    day: now.day,
    hour: 9,
  });
  const days = _.shuffle([...Array(daysCount).keys()])
    .slice(0, 6)
    .map((dayOffset) => {
      // for each day return 4 random times between 9 and 23
      return _.shuffle([...Array(daysCount).keys()])
        .slice(0, 4)
        .map((hourOffset) => {
          return today.plus({
            day: dayOffset,
            hour: hourOffset,
          });
        });
    });

  return _.flatten(days)
    .sort((a: DateTime, b: DateTime) => {
      return a < b ? -1 : a > b ? 1 : 0;
    })
    .map((dt) => {
      return {
        movieId: movie.id,
        cinemaTheaterId: cinemaTheaterId,
        projectionDateTime: dt.toJSDate(),
        is3D: _.sample([true, false]) as boolean,
        price: _.random(200, 500),
        currencyCode: CurrencyCode.RSD,
      };
    })
    .filter((mp) => !!mp);
};

@Injectable()
export class MovieProjectionsService {
  private readonly logger = new Logger(MovieProjectionsService.name);

  constructor(private prisma: PrismaService) {}

  async findById(movieProjectionId: string) {
    return this.prisma.movieProjection.findUnique({
      where: {
        id: movieProjectionId,
      },
      include: {
        movie: true,
        cinemaTheater: {
          include: {
            cinema: true,
            cinemaSeatGroups: {
              include: {
                cinemaSeats: true,
              },
            },
          },
        },
        reservations: {
          where: {
            deletedAt: null,
          },
          include: {
            reservationSeats: true,
          },
        },
        projectionPrices: true,
      },
    });
  }

  async createByUser(data: CreateMovieProjectionDto, user: AdminUserSafe) {
    // check if manager has access to passed cinema
    if (user.role !== AdminRole.SuperAdmin) {
      // get cinema
      const cinemaTheater = await this.prisma.cinemaTheater.findUnique({
        where: {
          id: data.cinemaTheaterId,
        },
      });
      if (!cinemaTheater || AuthHelper.checkAccessToCinema(user, cinemaTheater.cinemaId)) {
        return new ForbiddenException(FORBIDDEN_MESSAGE);
      }
    }

    return this.create(data);
  }

  async createByUserBulk(data: CreateBulkMovieProjectionDto, user: AdminUserSafe) {
    const [cinemaTheater, movie] = await Promise.all([
      this.prisma.cinemaTheater.findUnique({
        where: {
          id: data.cinemaTheaterId,
        },
        include: {
          cinemaSeatGroups: true,
        },
      }),
      this.prisma.movie.findUnique({where: {id: data.movieId}}),
    ]);

    if (!cinemaTheater) {
      throw new NotFoundException(`Cinema theater ${data.cinemaTheaterId} not found`);
    }

    if (!movie) {
      throw new NotFoundException(`Movie ${data.cinemaTheaterId} not found`);
    }

    // check if manager has access to passed cinema
    if (user.role !== AdminRole.SuperAdmin) {
      if (!cinemaTheater || AuthHelper.checkAccessToCinema(user, cinemaTheater.cinemaId)) {
        return new ForbiddenException(FORBIDDEN_MESSAGE);
      }
    }

    // open transaction
    return this.prisma.$transaction(async (transactionClient) => {
      return forEachAwait(data.projectionDetails, async (projectionData) => {
        // TODO write test for plain usage and race condition!

        const projectionStarts = DateTime.fromJSDate(projectionData.projectionDateTime).plus({minute: 10}); // allow 10 mins overlapping because of credits

        const projectionEnds = projectionStarts.plus({minute: movie.runtimeMinutes - 10});

        const overLappingProjections = await transactionClient.$queryRawTyped(
          getOverlappingProjections(data.cinemaTheaterId, projectionEnds.toJSDate(), projectionStarts.toJSDate()),
        );

        if (overLappingProjections.length > 0) {
          throw new InternalServerErrorException({
            code: 'OverlappingProjections',
            overLappingProjectionsMovieName: overLappingProjections[0].movieName,
            overLappingProjectionsCinemaTheater: cinemaTheater.name,
          });
        }

        const options: MovieProjectionOptions = {
          is3D: projectionData.is3D,
        };

        // create movie projection
        const movieProjection = await transactionClient.movieProjection.create({
          data: {
            movieId: data.movieId,
            cinemaTheaterId: data.cinemaTheaterId,
            projectionDateTime: projectionData.projectionDateTime,
            dubbedLanguageId: projectionData.dubbedLanguageId || null,
            updatedAt: new Date(),
            options,
          },
        });

        // create prices
        await Promise.all(
          cinemaTheater.cinemaSeatGroups.map((seatGroup) => {
            return transactionClient.projectionPrice.create({
              data: {
                projectionId: movieProjection.id,
                groupId: seatGroup.id,
                price: projectionData.price,
                currencyCode: projectionData.currencyCode,
              },
            });
          }),
        );

        return movieProjection;
      });
    });
  }

  async editByUser(movieProjectionId: string, data: EditMovieProjectionDto, user: AdminUserSafe) {
    // check if manager has access to passed cinema
    if (user.role !== AdminRole.SuperAdmin) {
      // get cinema
      const cinemaTheater = await this.prisma.cinemaTheater.findUnique({
        where: {
          id: data.cinemaTheaterId,
        },
      });
      if (!cinemaTheater || AuthHelper.checkAccessToCinema(user, cinemaTheater.cinemaId)) {
        return new ForbiddenException(FORBIDDEN_MESSAGE);
      }
    }

    return this.edit(movieProjectionId, data);
  }

  async create(data: CreateMovieProjectionDto) {
    const [cinemaTheater, movie] = await Promise.all([
      this.prisma.cinemaTheater.findUnique({
        where: {
          id: data.cinemaTheaterId,
        },
        include: {
          cinemaSeatGroups: true,
        },
      }),
      this.prisma.movie.findUnique({where: {id: data.movieId}}),
    ]);

    if (!cinemaTheater) {
      throw new NotFoundException(`Cinema theater ${data.cinemaTheaterId} not found`);
    }

    if (!movie) {
      throw new NotFoundException(`Movie ${data.cinemaTheaterId} not found`);
    }

    const options: MovieProjectionOptions = {
      is3D: data.is3D,
    };

    // open transaction
    return this.prisma.$transaction(async (transactionClient) => {
      // TODO write test for plain usage and race condition!

      // check if this session is already taken
      const projectionStarts = DateTime.fromJSDate(data.projectionDateTime).plus({minute: 10}); // allow 10 mins overlapping because of credits
      const projectionEnds = projectionStarts.plus({minute: movie.runtimeMinutes});

      const overLappingProjections = await transactionClient.$queryRawTyped(
        getOverlappingProjections(data.cinemaTheaterId, projectionEnds.toJSDate(), projectionStarts.toJSDate()),
      );

      if (overLappingProjections.length > 0) {
        throw new InternalServerErrorException('OverlappingProjections');
      }

      // create movie projection
      const movieProjection = await transactionClient.movieProjection.create({
        data: {
          movieId: data.movieId,
          cinemaTheaterId: data.cinemaTheaterId,
          projectionDateTime: data.projectionDateTime,
          dubbedLanguageId: data.dubbedLanguageId || null,
          updatedAt: new Date(),
          options,
        },
      });

      // create prices
      await Promise.all(
        cinemaTheater.cinemaSeatGroups.map((seatGroup) => {
          return transactionClient.projectionPrice.create({
            data: {
              projectionId: movieProjection.id,
              groupId: seatGroup.id,
              price: data.price,
              currencyCode: data.currencyCode,
            },
          });
        }),
      );

      return movieProjection;
    });
  }

  async edit(movieProjectionId: string, data: EditMovieProjectionDto) {
    const cinemaTheater = await this.prisma.cinemaTheater.findUnique({
      where: {
        id: data.cinemaTheaterId,
      },
      include: {
        cinemaSeatGroups: true,
      },
    });

    if (!cinemaTheater) {
      throw new NotFoundException(`Cinema theater ${data.cinemaTheaterId} not found`);
    }

    const movieProjection = await this.prisma.movieProjection.findUnique({
      where: {
        id: movieProjectionId,
      },
      include: {
        reservations: true,
        projectionPrices: true,
      },
    });

    if (!movieProjection) {
      throw new ForbiddenException('Movie projection not found');
    }

    if (movieProjection.reservations.length > 0) {
      throw new ForbiddenException('Cannot edit movie projection that has reservations');
    }

    const options: MovieProjectionOptions = {
      ...(movieProjection.options as MovieProjectionOptions),
      is3D: data.is3D,
    };

    // open transaction
    return this.prisma.$transaction(async (transactionClient) => {
      // edit movie projection
      const movieProjectionEdited = await transactionClient.movieProjection.update({
        where: {
          id: movieProjection.id,
        },
        data: {
          cinemaTheaterId: data.cinemaTheaterId,
          projectionDateTime: data.projectionDateTime,
          dubbedLanguageId: data.dubbedLanguageId || null,
          updatedAt: new Date(),
          options,
        },
      });

      // delete all projection prices
      await this.prisma.projectionPrice.deleteMany({
        where: {
          projectionId: movieProjectionId,
        },
      });

      // create prices
      await Promise.all(
        cinemaTheater.cinemaSeatGroups.map((seatGroup) => {
          return transactionClient.projectionPrice.create({
            data: {
              projectionId: movieProjection.id,
              groupId: seatGroup.id,
              price: data.price,
              currencyCode: data.currencyCode,
            },
          });
        }),
      );

      return movieProjectionEdited;
    });
  }

  async deleteMovieProjection(movieProjectionId: string) {
    const movieProjection = await this.prisma.movieProjection.findUnique({
      where: {
        id: movieProjectionId,
      },
      include: {
        reservations: true,
        projectionPrices: true,
      },
    });

    if (!movieProjection) {
      throw new ForbiddenException('Movie projection not found');
    }

    if (movieProjection.reservations.length > 0) {
      throw new ForbiddenException('Cannot delete movie projection that has reservations');
    }

    // first delete all projection prices
    await this.prisma.projectionPrice.deleteMany({
      where: {
        projectionId: movieProjectionId,
      },
    });

    await this.prisma.movieProjection.delete({
      where: {
        id: movieProjectionId,
      },
    });
  }

  async deleteBulkMovieProjections(movieProjectionIds: string[]) {
    // first delete all projection prices
    return this.prisma.$transaction(async (transactionClient) => {
      await transactionClient.projectionPrice.deleteMany({
        where: {
          projectionId: {
            in: movieProjectionIds,
          },
        },
      });

      await transactionClient.movieProjection.deleteMany({
        where: {
          id: {
            in: movieProjectionIds,
          },
        },
      });
    });
  }

  async findAll(
    params: {movieId?: string; cinemaId?: string; includeArchived: boolean},
    options: GetListOptions<MovieProjectionFilters> = {},
  ): Promise<ReturnList<MovieProjection>> {
    const {includeArchived = false} = params;
    const {filter} = options;

    const where: Record<string, unknown> = {
      movieId: params.movieId ? params.movieId : undefined,
      cinemaTheater: params.cinemaId
        ? {
            cinemaId: params.cinemaId,
          }
        : undefined,
      projectionDateTime: includeArchived ? undefined : excludeArchivedMovieProjectionsQuery(),
    };

    if (filter) {
      if (filter.movieName) {
        where['movie'] = {
          OR: [
            {
              localizedTitle: {
                contains: filter.movieName,
                mode: 'insensitive',
              },
            },
            {
              title: {
                contains: filter.movieName,
                mode: 'insensitive',
              },
            },
            {
              originalTitle: {
                contains: filter.movieName,
                mode: 'insensitive',
              },
            },
          ],
        };
      }
    }

    const [movieProjections, movieProjectionsCount] = await Promise.all([
      this.prisma.movieProjection.findMany({
        where,
        include: {
          cinemaTheater: {
            include: {
              cinema: {
                include: {
                  city: true,
                },
              },
            },
          },
          movie: true,
          projectionPrices: true,
        },
        skip: options.range?.skip,
        take: options.range?.take,
        orderBy: options.sort
          ? {
              [options.sort.field]: options.sort.order,
            }
          : undefined,
      }),
      this.prisma.movieProjection.count({
        where,
      }),
    ]);

    return {
      data: movieProjections,
      dataCount: movieProjections.length,
      total: movieProjectionsCount,
    };
  }

  async generateSingleMovieSingleCinema(days = 30, movieId: string, cinemaId: string) {
    // first delete all MovieProjections for passed movie and cinema
    const [movie, cinema] = await Promise.all([
      this.prisma.movie.findUnique({
        where: {
          id: movieId,
        },
      }),
      this.prisma.cinema.findUnique({
        where: {
          id: cinemaId,
        },
        include: {
          cinemaTheaters: true,
        },
      }),
    ]);

    if (movie && cinema) {
      // first delete all MovieProjections
      await this.prisma.movieProjection.deleteMany({
        where: {
          movieId: movie.id,
          cinemaTheaterId: {
            in: cinema.cinemaTheaters.map((cinemaTheater) => cinemaTheater.id),
          },
        },
      });

      const mpIds: string[] = [];
      const mpDtos = generateProjections(cinema, movie, days);
      for (const mpDto of mpDtos) {
        const mp = await this.create(mpDto);
        this.logger.debug(`Created movieProjection ${mp.id}`);
        mpIds.push(mp.id);
      }

      return mpIds;
    }

    throw new NotFoundException('Movie or cinema not found');
  }

  async generate(daysCount = 30) {
    // first delete all MovieProjections
    await this.prisma.movieProjection.deleteMany();

    // get all movies and cinema theaters
    const [movies, cinemas] = await Promise.all([
      this.prisma.movie.findMany(),
      this.prisma.cinema.findMany({
        include: {
          cinemaTheaters: true,
        },
      }),
    ]);

    const mpIds: string[] = [];
    for (const movie of movies) {
      for (const cinema of cinemas) {
        const mpDtos = generateProjections(cinema, movie, daysCount);
        for (const mpDto of mpDtos) {
          const mp = await this.create(mpDto);
          this.logger.debug(`Created movieProjection ${mp.id}`);
          mpIds.push(mp.id);
        }
      }
    }

    return mpIds;
  }

  async generateDemoProjections() {
    const cinemas = await this.prisma.cinema.findMany({
      include: {
        cinemaTheaters: true,
      },
    });
    const movies = await this.prisma.movie.findMany({
      orderBy: {
        releaseDate: 'desc',
      },
      take: 20,
    });

    return Promise.all(
      cinemas.map(async (cinema) => {
        const projections = await Promise.all(
          cinema.cinemaTheaters.map((ct) => {
            return Promise.all([
              this.create({
                cinemaTheaterId: ct.id,
                currencyCode: 'RSD',
                is3D: Date.now() % 2 === 0,
                movieId: (_.sample(movies) as Movie).id,
                price: getRandomInt(400, 1000),
                projectionDateTime: DateTime.now().plus({days: 1}).set({hour: 18, minute: 0, second: 0}).toJSDate(),
              }),
              this.create({
                cinemaTheaterId: ct.id,
                currencyCode: 'RSD',
                is3D: Date.now() % 2 === 0,
                movieId: (_.sample(movies) as Movie).id,
                price: getRandomInt(400, 1000),
                projectionDateTime: DateTime.now().plus({days: 10}).set({hour: 14, minute: 0, second: 0}).toJSDate(),
              }),
              this.create({
                cinemaTheaterId: ct.id,
                currencyCode: 'RSD',
                is3D: Date.now() % 2 === 0,
                movieId: (_.sample(movies) as Movie).id,
                price: getRandomInt(400, 1000),
                projectionDateTime: DateTime.now().plus({days: 8}).set({hour: 10, minute: 0, second: 0}).toJSDate(),
              }),
            ]);
          }),
        );

        return projections.map((cinemaP) => {
          return cinemaP.map((p) => {
            this.logger.log(
              `Inserted automatic demo projection ${p.id} for cinema theater ${p.cinemaTheaterId} and movie ${p.movieId}`,
            );

            return p.id;
          });
        });
      }),
    );
  }
}
