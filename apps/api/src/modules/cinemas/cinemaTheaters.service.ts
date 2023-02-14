import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

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
}
