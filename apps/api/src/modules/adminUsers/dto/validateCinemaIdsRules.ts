import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AdminRole } from '@prisma/client';
import { CreateAdminUserDto } from './create-admin-user.dto';

@ValidatorConstraint({ name: 'ValidateCinemaExistence', async: true })
@Injectable()
export class ValidateCinemaExistence implements ValidatorConstraintInterface {
  constructor(private prismaService: PrismaService) {}

  async validate(cinemaIds: string[]): Promise<boolean> {
    try {
      await Promise.all(
        cinemaIds.map((cinemaId) => {
          return this.prismaService.cinema.findUniqueOrThrow({
            where: {
              id: cinemaId,
            },
          });
        }),
      );
    } catch {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return `One or more passed cinemaId does not exist`;
  }
}

@ValidatorConstraint({ name: 'ValidateCinemaForPassedRole' })
@Injectable()
export class ValidateCinemaForPassedRole
  implements ValidatorConstraintInterface
{
  validate(
    cinemaIds: string[],
    validationArguments: ValidationArguments,
  ): boolean {
    const role: AdminRole = (validationArguments.object as CreateAdminUserDto)
      .role;

    if (role === 'SuperAdmin') {
      // we don't care about number of cinema for SuperAdmin
      return true;
    }

    if (role === AdminRole.Manager || role === AdminRole.Employee) {
      // demand there is at least one cinema for Manager and Employee roles
      return Array.isArray(cinemaIds) && cinemaIds.length > 0;
    }

    return true;
  }

  defaultMessage() {
    return `You need to add at least one cinema for this role`;
  }
}
