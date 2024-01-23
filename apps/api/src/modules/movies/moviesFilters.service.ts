import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {Country, Genre} from '@prisma/client';

@Injectable()
export class MoviesFiltersService {
  constructor(private prismaService: PrismaService) {}

  getGenres(): Promise<Genre[]> {
    return this.prismaService.genre.findMany();
  }

  getCountriesWithMovies(): Promise<Country[]> {
    return this.prismaService.country.findMany({
      where: {
        movies: {
          some: {},
        },
      },
    });
  }
}
