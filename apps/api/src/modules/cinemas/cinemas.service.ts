import { Injectable } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { PrismaService } from "../prisma/prisma.service";
import { Cinema, Prisma } from '@prisma/client';

@Injectable()
export class CinemasService {
  constructor(private prismaService: PrismaService) {}

  create(createCinemaDto: CreateCinemaDto) {
    return 'This action adds a new cinema';
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MovieWhereUniqueInput;
    where?: Prisma.MovieWhereInput;
    orderBy?: Prisma.MovieOrderByWithRelationInput;
  } = {},): Promise<Cinema[]> {
    return this.prismaService.cinema.findMany(params);
  }

  findOne(cinemaWhereUniqueInput: Prisma.CinemaWhereUniqueInput): Promise<Cinema | null> {
    return this.prismaService.cinema.findUnique({
      where: cinemaWhereUniqueInput
    });
  }

  update(id: number, updateCinemaDto: UpdateCinemaDto) {
    return `This action updates a #${id} cinema`;
  }

  remove(id: number) {
    return `This action removes a #${id} cinema`;
  }
}
