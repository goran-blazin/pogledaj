import { Injectable } from '@nestjs/common';
import { Movie, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private prismaService: PrismaService) {}

  create(data: CreateMovieDto) {
    return this.prismaService.movie.create({
      data: {
        ...data,
        updatedAt: Date().toString(),
      },
    });
  }

  async findAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.MovieWhereUniqueInput;
      where?: Prisma.MovieWhereInput;
      orderBy?: Prisma.MovieOrderByWithRelationInput;
    } = {},
    options: { includePersons?: boolean } = {},
  ): Promise<Movie[]> {
    const personInclude = options.includePersons
      ? {
          include: {
            person: true,
          },
        }
      : false;

    return this.prismaService.movie.findMany({
      ...params,
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

  update(params: {
    where: Prisma.MovieWhereUniqueInput;
    data: UpdateMovieDto;
  }) {
    return this.prismaService.movie.update({
      data: params.data,
      where: params.where,
    });
  }

  remove(movieWhereUniqueInput: Prisma.MovieWhereUniqueInput) {
    return this.prismaService.movie.delete({
      where: movieWhereUniqueInput,
    });
  }
}
