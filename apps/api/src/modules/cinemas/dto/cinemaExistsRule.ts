import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@ValidatorConstraint({ name: 'CinemaExistsRule', async: true })
@Injectable()
export class CinemaExistsRule implements ValidatorConstraintInterface {
  constructor(private prismaService: PrismaService) {}

  async validate(cinemaId: string): Promise<boolean> {
    try {
      await this.prismaService.cinema.findUniqueOrThrow({
        where: {
          id: cinemaId,
        },
      });
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return `Passed cinema does not exist`;
  }
}
