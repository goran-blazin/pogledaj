import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {City, Country, Genre, Movie, Prisma} from '@prisma/client';
import {MovieFilterSearchDto} from './dto/movieFilterSearch.dto';
import {DateTime} from 'ts-luxon';
import _ from 'lodash';
import {excludeArchivedMovieProjectionsQuery} from '../movieProjections/movieProjections.service';
import {ReturnList} from '../../types/CommonTypes';

@Injectable()
export class MoviesFiltersService {
  constructor(private prismaService: PrismaService) {}

  getGenres(): Promise<Genre[]> {
    return this.prismaService.genre.findMany({
      orderBy: {
        localizedName: 'asc',
      },
    });
  }

  getCountriesWithMovies(): Promise<Country[]> {
    return this.prismaService.country.findMany({
      where: {
        movies: {
          some: {},
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  getAllCitiesWithCinemas(): Promise<City[]> {
    return this.prismaService.city.findMany({
      where: {
        cinemas: {
          some: {},
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async searchFilter(params: MovieFilterSearchDto): Promise<ReturnList<Movie>> {
    const whereCondition: Prisma.MovieWhereInput = {
      ...(!_.isEmpty(params.movieLengths) && {
        OR: params.movieLengths.map((ml) => {
          switch (ml) {
            case 'to90Minutes':
              return {
                runtimeMinutes: {
                  lte: 90,
                },
              };
            case 'from90To120Minutes':
              return {
                runtimeMinutes: {
                  gte: 90,
                  lte: 120,
                },
              };
            case 'from120To180Minutes':
              return {
                runtimeMinutes: {
                  gte: 120,
                  lte: 180,
                },
              };
            case 'over180Minutes':
              return {
                runtimeMinutes: {
                  gte: 180,
                },
              };
          }
        }),
      }),
      ...(!_.isEmpty(params.selectedActorPersonIds) && {
        actors: {
          some: {
            personId: {
              in: params.selectedActorPersonIds,
            },
          },
        },
      }),
      ...(params.selectedDirectorPersonId && {
        directors: {
          some: {
            personId: params.selectedDirectorPersonId,
          },
        },
      }),
      ...(!_.isEmpty(params.selectedGenres) && {
        genres: {
          some: {
            systemName: {
              in: params.selectedGenres,
            },
          },
        },
      }),
      movieProjections: {
        some: {
          AND: [
            {
              projectionDateTime: excludeArchivedMovieProjectionsQuery(),
            },
            {
              projectionDateTime: {
                lte: params.selectedDateTo ? DateTime.fromISO(params.selectedDateTo).toJSDate() : undefined,
                gte: params.selectedDateFrom ? DateTime.fromISO(params.selectedDateFrom).toJSDate() : undefined,
              },
            },
          ],
          cinemaTheater: {
            cinema: {
              id: _.isEmpty(params.selectedCinemasIds)
                ? undefined
                : {
                    in: params.selectedCinemasIds,
                  },
              city: {
                id: params.selectedCityId ? params.selectedCityId : undefined,
                countryCode: _.isEmpty(params.selectedCountries)
                  ? undefined
                  : {
                      in: params.selectedCountries,
                    },
              },
            },
          },
        },
      },
    };

    const [movies, moviesCount] = await Promise.all([
      this.prismaService.movie.findMany({
        where: whereCondition,
        take: 50,
        include: {
          genres: true,
        },
      }),
      this.prismaService.movie.count({
        where: whereCondition,
      }),
    ]);

    return {
      data: movies,
      dataCount: movies.length,
      total: moviesCount,
    };
  }
}
