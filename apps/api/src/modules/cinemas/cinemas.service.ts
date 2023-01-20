import { Injectable } from '@nestjs/common';
// import { CreateCinemaDto } from './dto/create-cinema.dto';
// import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Cinema, Prisma } from '@prisma/client';
import { GetListOptions, ReturnList } from '../../types/CommonTypes';
import { resolveReactAdminFilters } from '../../helpers/Utils';

@Injectable()
export class CinemasService {
  constructor(private prismaService: PrismaService) {}

  // create(createCinemaDto: CreateCinemaDto) {
  create() {
    return 'This action adds a new cinema ';
  }

  async findAll(options: GetListOptions = {}): Promise<ReturnList<Cinema>> {
    const [cinemas, cinemasCount] = await Promise.all([
      this.prismaService.cinema.findMany({
        where: {
          ...resolveReactAdminFilters(options.filter),
        },
        skip: options.range?.skip,
        take: options.range?.take,
        include: {
          city: {
            include: {
              country: true,
            },
          },
        },
      }),
      this.prismaService.cinema.count({
        where: {
          ...resolveReactAdminFilters(options.filter),
        },
      }),
    ]);

    return {
      data: cinemas,
      total: cinemasCount,
    };
  }

  findOne(
    cinemaWhereUniqueInput: Prisma.CinemaWhereUniqueInput,
  ): Promise<Cinema | null> {
    return this.prismaService.cinema.findUnique({
      where: cinemaWhereUniqueInput,
      include: {
        city: {
          include: {
            country: true,
          },
        },
      },
    });
  }

  // update(id: number, updateCinemaDto: UpdateCinemaDto) {
  update(id: number) {
    return `This action updates a #${id} cinema`;
  }

  remove(id: number) {
    return `This action removes a #${id} cinema`;
  }
}
