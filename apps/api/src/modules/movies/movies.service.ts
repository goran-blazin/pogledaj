import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {Prisma, Movie, InputProvider} from '@prisma/client';
import {PrismaService} from '../prisma/prisma.service';
import {TmdbProvider} from './tmdb.provider';
import {MovieExternal, MovieLocalizedData, PersonForMovieExternal} from '../../types/MovieTypes';
import _ from 'lodash';
import {GetListOptions, ReturnList} from '../../types/CommonTypes';
import {excludeArchivedMovieProjectionsQuery} from '../movieProjections/movieProjections.service';
import {QueuesDefinition} from '../../helpers/QueuesHelper';
import {Queue} from 'bullmq';
import {InjectQueue} from '@nestjs/bullmq';

@Injectable()
export class MoviesService implements OnModuleInit {
  private readonly logger = new Logger(MoviesService.name);

  constructor(
    private prismaService: PrismaService,
    private tmdbProvider: TmdbProvider,
    @InjectQueue(QueuesDefinition.INSERT_MOVIES.name) private readonly automaticDataInsertQueue: Queue,
  ) {}

  async onModuleInit() {
    // Get all repeatable jobs
    const repeatableJobs = await this.automaticDataInsertQueue.getRepeatableJobs();
    // Iterate over the jobs and remove each one
    for (const job of repeatableJobs) {
      await this.automaticDataInsertQueue.removeRepeatableByKey(job.key);
    }

    await this.automaticDataInsertQueue.add(
      QueuesDefinition.INSERT_MOVIES.jobId,
      {},
      {
        repeat: {
          pattern: '0 5 * * 1',
        },
        jobId: QueuesDefinition.INSERT_MOVIES.jobId, // Ensure the job ID is unique to prevent multiple instances
      },
    );
  }

  // createByAdmin(data: CreateMovieDto) {
  //   return this.prismaService.movie.create({
  //     data: {
  //       ...data,
  //       updatedAt: Date().toString(),
  //       externalType: InputProvider.AdminInput,
  //       externalId: uuidV4(),
  //     },
  //   });
  // }

  async findAll(
    options: GetListOptions = {},
    {
      includePersons = false,
      onlyWithActiveProjections = false,
    }: {includePersons?: boolean; onlyWithActiveProjections?: boolean} = {},
  ): Promise<ReturnList<Movie>> {
    const includePersonsObject = includePersons
      ? {
          include: {
            person: true,
          },
        }
      : false;

    const where = {
      movieProjections: onlyWithActiveProjections
        ? {
            some: {
              projectionDateTime: excludeArchivedMovieProjectionsQuery(),
            },
          }
        : undefined,
    };

    const [movies, moviesCount] = await Promise.all([
      this.prismaService.movie.findMany({
        include: {
          genres: true,
          originalLanguage: true,
          countryOfOrigin: true,
          actors: includePersonsObject,
          directors: includePersonsObject,
          producers: includePersonsObject,
          movieProjections: {
            where: {
              projectionDateTime: excludeArchivedMovieProjectionsQuery(),
            },
            include: {
              reservations: {
                include: {
                  reservationSeats: true,
                },
              },
            },
          },
        },
        skip: options.range?.skip,
        take: options.range?.take,
        orderBy: options.sort
          ? {
              [options.sort.field]: options.sort.order,
            }
          : undefined,
        where,
      }),
      this.prismaService.movie.count({
        where,
      }),
    ]);

    return {
      data: movies,
      dataCount: movies.length,
      total: moviesCount,
    };
  }

  /**
   * This method return all movies who are considered to be soon on the repertoire meaning all moveis without any projections yet
   */
  findSoon(options: GetListOptions = {}) {
    return this.prismaService.movie.findMany({
      include: {
        genres: true,
        originalLanguage: true,
        countryOfOrigin: true,
      },
      skip: options.range?.skip,
      take: options.range?.take,
      orderBy: options.sort
        ? {
            [options.sort.field]: options.sort.order,
          }
        : undefined,
      where: {
        movieProjections: {
          none: {},
        },
      },
    });
  }

  async findOne(
    movieWhereUniqueInput: Prisma.MovieWhereUniqueInput,
    options: {includePersons?: boolean} = {},
  ): Promise<Movie | null> {
    const personInclude = options.includePersons
      ? {
          include: {
            person: true,
          },
        }
      : false;

    return this.prismaService.movie.findUnique({
      where: movieWhereUniqueInput,
      include: {
        genres: true,
        originalLanguage: true,
        countryOfOrigin: true,
        actors: personInclude,
        directors: personInclude,
        producers: personInclude,
      },
    });
  }

  // update(params: {
  //   where: Prisma.MovieWhereUniqueInput;
  //   data: UpdateMovieDto;
  // }) {
  //   return this.prismaService.movie.update({
  //     data: params.data,
  //     where: params.where,
  //   });
  // }

  // remove(movieId: string) {
  //   return this.prismaService.movie.delete({
  //     where: {
  //       id: movieId,
  //     },
  //     include: {
  //       actors: true,
  //       directors: true,
  //       producers: true,
  //     },
  //   });
  // }

  async upsertNewPopularMovies(externalType: InputProvider = InputProvider.Tmdb) {
    const newPopularMovies = await (() => {
      switch (externalType) {
        case InputProvider.Tmdb:
          return this.tmdbProvider.getNewPopularMovies();
        default:
          throw new Error('Invalid InputProvider ' + externalType);
      }
    })();

    const upsertedMovies: string[] = [];
    const failedMovies: string[] = [];

    for (const id of newPopularMovies) {
      try {
        await this.upsertFromExternal(externalType, id);
        upsertedMovies.push(id);
        this.logger.log(`Upserted automatically movie from ${externalType} with ID: ${id}`);
      } catch (e) {
        failedMovies.push(id);
        this.logger.error(`Error upserting movie from ${externalType} with ID: ${id}`, (e as Error).stack, e);
      }
    }

    return {
      upsertedMovies,
      failedMovies,
    };
  }

  async upsertFromExternal(externalType: InputProvider, externalId: string, localizedData?: MovieLocalizedData) {
    this.logger.log(`Trying to retrieve movie with id ${externalId} from ${externalType} provider`);
    const externalMovieData: MovieExternal = await (() => {
      switch (externalType) {
        case InputProvider.Tmdb:
          return this.tmdbProvider.getMovieByTMDBId(externalId);
        default:
          throw new Error('Invalid InputProvider ' + externalType);
      }
    })();

    this.logger.log(
      `Successfully retrieved movie with id ${externalId} from ${externalType} provider. Trying to insert in DB`,
    );

    // open transaction
    await this.prismaService.$transaction(
      async (transactionClient) => {
        // add country if not exist
        const countryOfOrigin = await transactionClient.country.upsert({
          where: {
            code: externalMovieData.countryOfOrigin.code.toUpperCase(),
          },
          create: {
            code: externalMovieData.countryOfOrigin.code.toUpperCase(),
            name: externalMovieData.countryOfOrigin.name,
          },
          update: {},
        });

        // add language
        const originalLanguage = await transactionClient.language.upsert({
          where: {
            code: externalMovieData.originalLanguageCode.toUpperCase(),
          },
          create: {
            code: externalMovieData.originalLanguageCode.toUpperCase(),
            name: externalMovieData.originalLanguageCode.toUpperCase(),
          },
          update: {},
        });

        // upsert persons
        const upsertPersons = (moviePersons: PersonForMovieExternal[]) =>
          Promise.all(
            moviePersons.map((moviePerson) => {
              return transactionClient.person.upsert({
                where: {
                  externalId_externalType: {
                    externalId: moviePerson.externalId,
                    externalType: moviePerson.externalType,
                  },
                },
                create: {
                  name: moviePerson.name,
                  biography: moviePerson.biography,
                  dateOfBirth: moviePerson.dateOfBirth,
                  dateOfDeath: moviePerson.dateOfDeath,
                  gender: moviePerson.gender,
                  updatedAt: new Date(),
                  externalId: moviePerson.externalId,
                  externalType: moviePerson.externalType,
                  additionalData: moviePerson.additionalData,
                },
                update: {
                  name: moviePerson.name,
                  biography: moviePerson.biography,
                  dateOfBirth: moviePerson.dateOfBirth,
                  dateOfDeath: moviePerson.dateOfDeath,
                  gender: moviePerson.gender,
                  updatedAt: new Date(),
                  additionalData: moviePerson.additionalData,
                },
              });
            }),
          );

        const upsertedActors = await upsertPersons(externalMovieData.actors.map((actor) => actor.person));

        const upsertedDirectors = await upsertPersons(externalMovieData.directors.map((actor) => actor.person));

        const upsertedProducers = await upsertPersons(externalMovieData.producers.map((actor) => actor.person));

        // upsert movie
        const upsertedMovie = await transactionClient.movie.upsert({
          where: {
            externalId_externalType: {
              externalId: externalId,
              externalType: externalType,
            },
          },
          create: {
            originalTitle: externalMovieData.originalTitle,
            plot: externalMovieData.plot,
            genres: {
              connectOrCreate: externalMovieData.genreCodes.map((genreCode) => {
                return {
                  where: {
                    systemName: genreCode.toLowerCase(),
                  },
                  create: {
                    systemName: genreCode.toLowerCase(),
                    localizedName: _.upperFirst(genreCode.toLowerCase()),
                  },
                };
              }),
            },
            runtimeMinutes: externalMovieData.runtimeMinutes,
            originalLanguageId: originalLanguage.code,
            countryOfOriginId: countryOfOrigin.code,
            posterImages: externalMovieData.posterImages,
            videos: externalMovieData.videos,
            rating: externalMovieData.rating,
            releaseDate: new Date(externalMovieData.releaseDate),
            additionalData: externalMovieData.additionalData,
            localizedTitle: localizedData?.localizedTitle,
            localizedPlot: localizedData?.localizedPlot,
            updatedAt: new Date(),
            externalType: externalMovieData.externalType,
            externalId: externalMovieData.externalId,
          },
          update: {
            originalTitle: externalMovieData.originalTitle,
            plot: externalMovieData.plot,
            genres: {
              connectOrCreate: externalMovieData.genreCodes.map((genreCode) => {
                return {
                  where: {
                    systemName: genreCode.toLowerCase(),
                  },
                  create: {
                    systemName: genreCode.toLowerCase(),
                    localizedName: _.upperFirst(genreCode.toLowerCase()),
                  },
                };
              }),
            },
            runtimeMinutes: externalMovieData.runtimeMinutes,
            originalLanguageId: originalLanguage.code,
            countryOfOriginId: countryOfOrigin.code,
            posterImages: externalMovieData.posterImages,
            videos: externalMovieData.videos,
            rating: externalMovieData.rating,
            releaseDate: new Date(externalMovieData.releaseDate),
            additionalData: externalMovieData.additionalData,
            localizedTitle: localizedData?.localizedTitle,
            localizedPlot: localizedData?.localizedPlot,
            updatedAt: new Date(),
          },
        });

        // upsert movie actors
        await Promise.all(
          externalMovieData.actors.map((externalMovieActor) => {
            const upsertedActorPerson = upsertedActors.find(
              (a) =>
                a.externalId === externalMovieActor.person.externalId &&
                a.externalType === externalMovieActor.person.externalType,
            );
            if (upsertedActorPerson) {
              return transactionClient.movieActor.upsert({
                where: {
                  personId_movieId: {
                    personId: upsertedActorPerson.id,
                    movieId: upsertedMovie.id,
                  },
                },
                create: {
                  person: {
                    connect: {
                      id: upsertedActorPerson.id,
                    },
                  },
                  movie: {
                    connect: {
                      id: upsertedMovie.id,
                    },
                  },
                  characterName: externalMovieActor.characterName,
                  castOrder: externalMovieActor.castOrder,
                },
                update: {
                  characterName: externalMovieActor.characterName,
                  castOrder: externalMovieActor.castOrder,
                },
              });
            }
          }),
        );

        // upsert movie directors
        await Promise.all(
          externalMovieData.directors.map((externalMovieDirector) => {
            const upsertedDirectorPerson = upsertedDirectors.find(
              (person) =>
                person.externalId === externalMovieDirector.person.externalId &&
                person.externalType === externalMovieDirector.person.externalType,
            );
            if (upsertedDirectorPerson) {
              return transactionClient.movieDirector.upsert({
                where: {
                  personId_movieId: {
                    personId: upsertedDirectorPerson.id,
                    movieId: upsertedMovie.id,
                  },
                },
                create: {
                  person: {
                    connect: {
                      id: upsertedDirectorPerson.id,
                    },
                  },
                  movie: {
                    connect: {
                      id: upsertedMovie.id,
                    },
                  },
                  type: externalMovieDirector.type,
                },
                update: {
                  type: externalMovieDirector.type,
                },
              });
            }
          }),
        );

        // upsert movie producers
        await Promise.all(
          externalMovieData.producers.map((externalMovieProducer) => {
            const upsertedProducerPerson = upsertedProducers.find(
              (person) =>
                person.externalId === externalMovieProducer.person.externalId &&
                person.externalType === externalMovieProducer.person.externalType,
            );
            if (upsertedProducerPerson) {
              return transactionClient.movieProducer.upsert({
                where: {
                  personId_movieId: {
                    personId: upsertedProducerPerson.id,
                    movieId: upsertedMovie.id,
                  },
                },
                create: {
                  person: {
                    connect: {
                      id: upsertedProducerPerson.id,
                    },
                  },
                  movie: {
                    connect: {
                      id: upsertedMovie.id,
                    },
                  },
                  type: externalMovieProducer.type,
                },
                update: {
                  type: externalMovieProducer.type,
                },
              });
            }
          }),
        );
      },
      {
        maxWait: 5000,
        timeout: 30000,
      },
    ); // closed transaction

    this.logger.log(`Successfully inserted movie with id ${externalId} from ${externalType} in DB`);

    return this.prismaService.movie.findUnique({
      where: {
        externalId_externalType: {
          externalId: externalMovieData.externalId,
          externalType: externalMovieData.externalType,
        },
      },
      include: {
        genres: true,
        actors: {
          include: {
            person: true,
          },
        },
        directors: {
          include: {
            person: true,
          },
        },
        producers: {
          include: {
            person: true,
          },
        },
        originalLanguage: true,
        countryOfOrigin: true,
      },
    });
  }
}
