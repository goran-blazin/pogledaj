import { Injectable } from '@nestjs/common';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { AdminUser } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminUsersService {
  constructor(private prismaService: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createAdminUserDto: CreateAdminUserDto) {
    return 'This action adds a new adminUser';
  }

  findAll() {
    return `This action returns all adminUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminUser`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateAdminUserDto: UpdateAdminUserDto) {
    return `This action updates a #${id} adminUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminUser`;
  }

  async findByEmail(email: string): Promise<AdminUser | null> {
    return this.prismaService.adminUser.findFirst({
      where: {
        email: email,
      },
    });
  }
}
