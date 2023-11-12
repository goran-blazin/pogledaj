import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/createReservation.dto';

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

  // async findAll() {
  //   return this.prismaService.reservation.findMany();
  // }
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
