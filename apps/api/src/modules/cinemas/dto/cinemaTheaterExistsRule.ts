import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@ValidatorConstraint({ name: 'CinemaTheaterExistsRule', async: true })
@Injectable()
export class CinemaTheaterExistsRule implements ValidatorConstraintInterface {
  constructor(private prismaService: PrismaService) {}

  async validate(cinemaTheaterId: string): Promise<boolean> {
    try {
      const cinemaTheater =
        await this.prismaService.cinemaTheater.findUniqueOrThrow({
          where: {
            id: cinemaTheaterId,
          },
          include: {
            cinemaSeatGroups: true,
          },
        });

      if (cinemaTheater.cinemaSeatGroups.length === 0) {
        return false;
      }
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return `Passed cinema theater does not exist or is incomplete`;
  }
}
