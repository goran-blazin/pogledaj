import { Injectable } from '@nestjs/common';
import { Movie, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';

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
  ): Promise<Movie[]> {
    return this.prismaService.movie.findMany(params);
  }

  async findOne(
    movieWhereUniqueInput: Prisma.MovieWhereUniqueInput,
  ): Promise<Movie | null> {
    return this.prismaService.movie.findUnique({
      where: movieWhereUniqueInput,
    });
  }

  update(params: {
    where: Prisma.MovieWhereUniqueInput;
    data: Prisma.MovieUpdateInput;
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