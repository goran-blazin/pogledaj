import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { GetListOptions, ReturnList } from '../../types/CommonTypes';
import { CinemaTheater } from '@prisma/client';
import { resolveReactAdminFilters } from '../../helpers/Utils';

@Injectable()
export class CinemaTheatersService {
  constructor(private prismaService: PrismaService) {}

  async findById(cinemaTheaterId: string) {
    return this.prismaService.cinemaTheater.findUnique({
      where: {
        id: cinemaTheaterId,
      },
    });
  }

  async findAll(
    options: GetListOptions = {},
  ): Promise<ReturnList<CinemaTheater>> {
    const [cinemaTheaters, cinemaTheatersCount] = await Promise.all([
      this.prismaService.cinemaTheater.findMany({
        where: {
          ...resolveReactAdminFilters(options.filter),
        },
        skip: options.range?.skip,
        take: options.range?.take,
        orderBy: options.sort
          ? {
              [options.sort.field]: options.sort.order,
            }
          : undefined,
      }),
      this.prismaService.cinemaTheater.count({
        where: {
          ...resolveReactAdminFilters(options.filter),
        },
      }),
    ]);

    return {
      data: cinemaTheaters,
      dataCount: cinemaTheaters.length,
      total: cinemaTheatersCount,
    };
  }
}
