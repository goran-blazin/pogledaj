import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/createReservation.dto';
import { GetListOptions, ReturnList } from '../../types/CommonTypes';
import { Reservation } from '@prisma/client';
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

  async findAll(
    options: GetListOptions = {},
  ): Promise<ReturnList<Reservation>> {
    const [reservations, reservationsCount] = await Promise.all([
      this.prismaService.reservation.findMany({
        where: {
          ...resolveReactAdminFilters(options.filter),
        },
        include: {
          reservationSeats: true,
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
        },
      }),
    ]);

    return {
      data: reservations,
      dataCount: reservations.length,
      total: reservationsCount,
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

  // async remove(id: string) {
  //   return this.prismaService.reservation.delete({ where: { id } });
  // }
}
