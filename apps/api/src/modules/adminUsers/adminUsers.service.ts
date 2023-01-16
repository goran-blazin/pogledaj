import { Injectable } from '@nestjs/common';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AdminUserSafe } from '../../types/CommonTypes';
import { AdminRole, AdminUser } from '@prisma/client';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';

function makeAdminUserSafe(adminUser: AdminUser): AdminUserSafe {
  return _.omit(adminUser, ['password']);
}

@Injectable()
export class AdminUsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createAdminUserDto: CreateAdminUserDto): Promise<AdminUserSafe> {
    const hash = await bcrypt.hash(createAdminUserDto.password, 10);
    const adminUser = await this.prismaService.adminUser.create({
      data: {
        email: createAdminUserDto.email,
        password: hash,
        fullName: createAdminUserDto.fullName,
        role: createAdminUserDto.role,
        cinemaIds: createAdminUserDto.cinemaIds,
        updatedAt: new Date(),
      },
    });

    return makeAdminUserSafe(adminUser);
  }

  async findAll(): Promise<AdminUserSafe[]> {
    return (await this.prismaService.adminUser.findMany()).map(
      makeAdminUserSafe,
    );
  }

  async findAllEmployeesForCinema(cinemaId: string): Promise<AdminUserSafe[]> {
    const adminUsers = await this.prismaService.adminUser.findMany({
      where: {
        role: AdminRole.Employee,
        cinemaIds: {
          array_contains: cinemaId,
        },
      },
    });
    return adminUsers.map(makeAdminUserSafe);
  }

  async findOne(id: string): Promise<AdminUserSafe | null> {
    const adminUser = await this.prismaService.adminUser.findUnique({
      where: {
        id,
      },
    });

    return adminUser ? makeAdminUserSafe(adminUser) : null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateAdminUserDto: UpdateAdminUserDto) {
    return `This action updates a #${id} adminUser`;
  }

  remove(id: string) {
    return this.prismaService.adminUser.delete({
      where: {
        id,
      },
    });
  }

  /**
   * This is the only method that is returning password with user so please use with caution!
   * @param email
   */
  async findByEmailUnsafe(email: string): Promise<AdminUser | null> {
    return this.prismaService.adminUser.findFirst({
      where: {
        email: email,
      },
    });
  }

  async findByEmail(email: string): Promise<AdminUserSafe | null> {
    return this.prismaService.adminUser.findFirst({
      where: {
        email: email,
      },
    });
  }
}
