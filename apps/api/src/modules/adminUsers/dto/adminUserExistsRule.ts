import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'AdminUserExistsRule', async: true })
@Injectable()
export class AdminUserExistsRule implements ValidatorConstraintInterface {
  constructor(private prismaService: PrismaService) {}

  async validate(email: string): Promise<boolean> {
    try {
      await this.prismaService.adminUser.findUniqueOrThrow({
        where: {
          email,
        },
      });
    } catch (e) {
      return true;
    }

    return false;
  }

  defaultMessage() {
    return `Admin user with this email already exists`;
  }
}
