import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {City, Country, Genre} from '@prisma/client';

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
}
