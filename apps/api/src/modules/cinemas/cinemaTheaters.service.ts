import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { GetListOptions, ReturnList } from '../../types/CommonTypes';
import { CinemaTheater } from '@prisma/client';
import { resolveReactAdminFilters } from '../../helpers/Utils';
import { CreateCinemaTheaterDto } from './dto/createCinemaTheater.dto';

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

  async create(createCinemaTheaterDto: CreateCinemaTheaterDto) {
    return this.prismaService.cinemaTheater.create({
      data: {
        name: createCinemaTheaterDto.name,
        supports3D: createCinemaTheaterDto.supports3D,
        posterImages: [],
        cinemaId: createCinemaTheaterDto.cinemaId,
        cinemaSeatGroups: {
          create: {
            name: '',
            rowCount: createCinemaTheaterDto.rowCount,
            columnCount: createCinemaTheaterDto.columnCount,
            position: 'Center',
            cinemaSeats: {
              create: Array.from(
                { length: createCinemaTheaterDto.rowCount },
                (_, rowCount) => {
                  return Array.from(
                    { length: createCinemaTheaterDto.columnCount },
                    (_, columnCount) => {
                      return {
                        seatRow: rowCount.toString(),
                        seatColumn: columnCount.toString(),
                      };
                    },
                  );
                },
              ).flat(), // we will for now hardcode the number of seats to row X column
            },
          },
        },
      },
    });
  }

  async delete(cinemaTheaterId: string) {
    return this.prismaService.cinemaTheater.delete({
      where: {
        id: cinemaTheaterId,
      },
    });
  }
}
