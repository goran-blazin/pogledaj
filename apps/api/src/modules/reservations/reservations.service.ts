import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/createReservation.dto';
import {
  AdminUserSafe,
  GetListOptions,
  ReturnList,
} from '../../types/CommonTypes';
import { Reservation, ReservationSeats } from '@prisma/client';
import { resolveReactAdminFilters } from '../../helpers/Utils';

@Injectable()
export class ReservationsService {
  constructor(private prismaService: PrismaService) {}

  async create(createReservationDto: CreateReservationDto) {
    return this.prismaService.reservation.create({
      data: {
        eventId: createReservationDto.eventId,
        customerInformation: {
          name: createReservationDto.customerName,
          phone: createReservationDto.customerPhone,
          email: createReservationDto.customerEmail,
        },
        updatedAt: new Date(),
        reservationSeats: {
          createMany: {
            data: createReservationDto.seatIds.map((seatId) => {
              return {
                eventId: createReservationDto.eventId,
                seatId,
              };
            }),
          },
        },
      },
    });
  }

  async findAll({
    options = {},
    includeSoftDeleted = false,
  }: {
    options: GetListOptions;
    includeSoftDeleted?: boolean;
  }): Promise<ReturnList<Reservation>> {
    const includeSoftDeletedWhere = includeSoftDeleted
      ? {}
      : { deletedAt: null };

    const [reservations, reservationsCount] = await Promise.all([
      this.prismaService.reservation.findMany({
        where: {
          ...resolveReactAdminFilters(options.filter),
          ...includeSoftDeletedWhere,
        },
        include: {
          reservationSeats: {
            include: {
              cinemaSeat: true,
            },
          },
          movieProjection: {
            include: {
              movie: true,
              cinemaTheater: {
                include: {
                  cinema: true,
                },
              },
            },
          },
        },
        skip: options.range?.skip,
        take: options.range?.take,
        orderBy: options.sort
          ? {
              [options.sort.field]: options.sort.order,
            }
          : undefined,
      }),
      this.prismaService.reservation.count({
        where: {
          ...resolveReactAdminFilters(options.filter),
          ...includeSoftDeletedWhere,
        },
      }),
    ]);

    return {
      data: reservations,
      dataCount: reservations.length,
      total: reservationsCount,
    };
  }

  async findAllSeats({
    options = {},
    includeSoftDeleted = false,
  }: {
    options: GetListOptions;
    includeSoftDeleted?: boolean;
  }): Promise<ReturnList<ReservationSeats>> {
    const includeSoftDeletedWhere = includeSoftDeleted
      ? {}
      : { deletedAt: null };

    const [reservationSeats, reservationSeatsCount] = await Promise.all([
      this.prismaService.reservationSeats.findMany({
        where: {
          ...resolveReactAdminFilters(options.filter),
          ...includeSoftDeletedWhere,
        },
        include: {
          cinemaSeat: true,
          validatedByAdminUser: true,
          reservation: {
            include: {
              movieProjection: {
                include: {
                  movie: true,
                  cinemaTheater: {
                    include: {
                      cinema: true,
                    },
                  },
                },
              },
            },
          },
        },
        skip: options.range?.skip,
        take: options.range?.take,
        orderBy: options.sort
          ? {
              [options.sort.field]: options.sort.order,
            }
          : undefined,
      }),
      this.prismaService.reservationSeats.count({
        where: {
          ...resolveReactAdminFilters(options.filter),
          ...includeSoftDeletedWhere,
        },
      }),
    ]);

    return {
      data: reservationSeats,
      dataCount: reservationSeats.length,
      total: reservationSeatsCount,
    };
  }
  //
  // async findOne(id: string) {
  //   return this.prismaService.reservation.findUnique({ where: { id } });
  // }

  // async update(id: string, data: ReservationUpdateInput) {
  //   return this.prismaService.reservation.update({
  //     where: { id },
  //     data,
  //   });
  // }

  async remove(id: string) {
    return this.prismaService.$transaction(async (transactionClient) => {
      await transactionClient.reservationSeats.updateMany({
        where: { reservationId: id },
        data: { deletedAt: new Date() },
      });

      await transactionClient.reservation.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    });
  }

  /**
   * Validate all seats for whole reservation
   */
  async validateReservation(reservationId: string, adminUser: AdminUserSafe) {
    return this.prismaService.reservationSeats.updateMany({
      where: {
        reservationId,
        validatedAt: null,
      },
      data: {
        validatedAt: new Date(),
        validatedByAdminUserId: adminUser.id,
      },
    });
  }
}
