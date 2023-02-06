import { Injectable, Logger } from '@nestjs/common';
import { Movie, InputProvider, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
// import { CreateMovieDto } from './dto/create-movie.dto';
// import { UpdateMovieDto } from './dto/update-movie.dto';
import { TmdbProvider } from './tmdb.provider';
import {
  MovieExternal,
  MovieLocalizedData,
  PersonForMovieExternal,
} from '../../types/MovieTypes';
import * as _ from 'lodash';
import { GetListOptions, ReturnList } from '../../types/CommonTypes';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);

  constructor(
    private prismaService: PrismaService,
    private tmdbProvider: TmdbProvider,
  ) {}

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
    { includePersons }: { includePersons?: boolean },
  ): Promise<ReturnList<Movie>> {
    const includePersonsObject = includePersons
      ? {
          include: {
            person: true,
          },
        }
      : false;

    const [movies, moviesCount] = await Promise.all([
      this.prismaService.movie.findMany({
        include: {
          genres: true,
          originalLanguage: true,
          countryOfOrigin: true,
          actors: includePersonsObject,
          directors: includePersonsObject,
          producers: includePersonsObject,
        },
        skip: options.range?.skip,
        take: options.range?.take,
        orderBy: options.sort
          ? {
              [options.sort.field]: options.sort.order,
            }
          : undefined,
      }),
      this.prismaService.movie.count(),
    ]);

    return {
      data: movies,
      total: moviesCount,
    };
  }

  async findOne(
    movieWhereUniqueInput: Prisma.MovieWhereUniqueInput,
    options: { includePersons?: boolean } = {},
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

  async upsertFromExternal(
    externalType: InputProvider,
    externalId: string,
    localizedData: MovieLocalizedData,
  ) {
    this.logger.log(
      `Trying to retrieve movie with id ${externalId} from ${externalType} provider`,
    );
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

        const upsertedActors = await upsertPersons(
          externalMovieData.actors.map((actor) => actor.person),
        );

        const upsertedDirectors = await upsertPersons(
          externalMovieData.directors.map((actor) => actor.person),
        );

        const upsertedProducers = await upsertPersons(
          externalMovieData.producers.map((actor) => actor.person),
        );

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
            rating: externalMovieData.rating,
            releaseDate: new Date(externalMovieData.releaseDate),
            additionalData: externalMovieData.additionalData,
            localizedTitle: localizedData.localizedTitle,
            localizedPlot: localizedData.localizedPlot,
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
            rating: externalMovieData.rating,
            releaseDate: new Date(externalMovieData.releaseDate),
            additionalData: externalMovieData.additionalData,
            localizedTitle: localizedData.localizedTitle,
            localizedPlot: localizedData.localizedPlot,
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
                person.externalType ===
                  externalMovieDirector.person.externalType,
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
                person.externalType ===
                  externalMovieProducer.person.externalType,
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

    this.logger.log(
      `Successfully inserted movie with id ${externalId} from ${externalType} in DB`,
    );

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
