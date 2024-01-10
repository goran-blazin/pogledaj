import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieProjectionDto } from './dto/createMovieProjection.dto';
import { MovieProjectionOptions } from './movieProjections.types';
import { DateTime } from 'ts-luxon';
import {
  AdminRole,
  Cinema,
  CinemaTheater,
  CurrencyCode,
  Movie,
  MovieProjection,
} from '@prisma/client';
import * as _ from 'lodash';
import { Logger } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import {
  AdminUserSafe,
  GetListOptions,
  ReturnList,
} from '../../types/CommonTypes';
import AuthHelper from '../../helpers/Auth.helper';
import { FORBIDDEN_MESSAGE } from '@nestjs/core/guards';

const RESERVATION_TIME_OFFSET_MINUTES = 30;

const generateProjections = (
  cinema: Cinema & { cinemaTheaters: CinemaTheater[] },
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

  constructor(private prismaService: PrismaService) {}

  async findById(movieProjectionId: string) {
    return this.prismaService.movieProjection.findUnique({
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
      },
    });
  }

  async createByUser(data: CreateMovieProjectionDto, user: AdminUserSafe) {
    // check if manager has access to passed cinema
    if (user.role !== AdminRole.SuperAdmin) {
      // get cinema
      const cinemaTheater = await this.prismaService.cinemaTheater.findUnique({
        where: {
          id: data.cinemaTheaterId,
        },
      });
      if (
        !cinemaTheater ||
        AuthHelper.checkAccessToCinema(user, cinemaTheater.cinemaId)
      ) {
        return new ForbiddenException(FORBIDDEN_MESSAGE);
      }
    }

    return this.create(data);
  }

  async create(data: CreateMovieProjectionDto) {
    const cinemaTheater = await this.prismaService.cinemaTheater.findUnique({
      where: {
        id: data.cinemaTheaterId,
      },
      include: {
        cinemaSeatGroups: true,
      },
    });

    if (!cinemaTheater) {
      throw new NotFoundException(
        `Cinema theater ${data.cinemaTheaterId} not found`,
      );
    }

    const options: MovieProjectionOptions = {
      is3D: data.is3D,
    };

    // open transaction
    return this.prismaService.$transaction(async (transactionClient) => {
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

  async findAll(
    params: { movieId?: string; cinemaId?: string; includeArchived: boolean },
    options: GetListOptions = {},
  ): Promise<ReturnList<MovieProjection>> {
    const { includeArchived = false } = params;
    const where = {
      movieId: params.movieId ? params.movieId : undefined,
      cinemaTheater: params.cinemaId
        ? {
            cinemaId: params.cinemaId,
          }
        : undefined,
      projectionDateTime: includeArchived
        ? undefined
        : {
            gt: DateTime.now()
              .plus({ minute: RESERVATION_TIME_OFFSET_MINUTES })
              .toJSDate(),
          },
    };

    const [movieProjections, movieProjectionsCount] = await Promise.all([
      this.prismaService.movieProjection.findMany({
        where,
        include: {
          cinemaTheater: {
            include: {
              cinema: true,
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
      this.prismaService.movieProjection.count({
        where,
      }),
    ]);

    return {
      data: movieProjections,
      dataCount: movieProjections.length,
      total: movieProjectionsCount,
    };
  }

  async generateSingleMovieSingleCinema(
    days = 30,
    movieId: string,
    cinemaId: string,
  ) {
    // first delete all MovieProjections for passed movie and cinema
    const [movie, cinema] = await Promise.all([
      this.prismaService.movie.findUnique({
        where: {
          id: movieId,
        },
      }),
      this.prismaService.cinema.findUnique({
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
      await this.prismaService.movieProjection.deleteMany({
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
    await this.prismaService.movieProjection.deleteMany();

    // get all movies and cinema theaters
    const [movies, cinemas] = await Promise.all([
      this.prismaService.movie.findMany(),
      this.prismaService.cinema.findMany({
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
}
