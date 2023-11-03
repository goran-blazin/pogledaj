import { Injectable } from '@nestjs/common';
// import { CreateCinemaDto } from './dto/create-cinema.dto';
// import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Cinema, Prisma } from '@prisma/client';
import { GetListOptions, ReturnList } from '../../types/CommonTypes';
import { resolveReactAdminFilters } from '../../helpers/Utils';
import { CreateCinemaDto } from './dto/createCinema.dto';

@Injectable()
export class CinemasService {
  constructor(private prismaService: PrismaService) {}

  create(createCinemaDto: CreateCinemaDto) {
    return this.prismaService.cinema.create({
      data: {
        name: createCinemaDto.name,
        description: createCinemaDto.description,
        address: createCinemaDto.address,
        rating: 0,
        phone: createCinemaDto.phone ? [createCinemaDto.phone] : [],
        posterImages: [],
        cityId: createCinemaDto.cityId,
      },
    });
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
      dataCount: cinemas.length,
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

  remove(id: string) {
    return this.prismaService.cinema.delete({
      where: {
        id,
      },
    });
  }
}
