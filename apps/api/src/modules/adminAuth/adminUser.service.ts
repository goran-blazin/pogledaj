import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AdminUser } from '@prisma/client';

@Injectable()
export class AdminUserService {
  constructor(private prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<AdminUser | null> {
    return this.prismaService.adminUser.findFirst({
      where: {
        email: email,
      },
    });
  }
}
