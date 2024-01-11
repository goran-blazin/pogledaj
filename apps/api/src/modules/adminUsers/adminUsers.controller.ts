import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  ForbiddenException,
  Req,
  Query,
} from '@nestjs/common';
import {AdminUsersService} from './adminUsers.service';
import {CreateAdminUserDto} from './dto/create-admin-user.dto';
// import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import {AdminRole} from '@prisma/client';
import {Roles} from '../../decorators/roles.decorator';
import {JwtAdminAuthGuard} from '../../guards/jwtAdminAuth.guard';
import {AdminUserSafe, ExpressRequestWithUser} from '../../types/CommonTypes';
import {FORBIDDEN_MESSAGE} from '@nestjs/core/guards';
import {NotFoundException} from '@nestjs/common/exceptions/not-found.exception';

function checkUserRolePermissions(
  loggedUser: AdminUserSafe,
  adminUserRole: AdminRole,
  cinemaIds: string[],
  adminUserId?: string,
): boolean {
  // if logged user is managing themselves allow everything
  if (loggedUser.id === adminUserId) {
    return true;
  }

  switch (loggedUser.role) {
    case 'SuperAdmin':
      // super admins can do anything
      return true;
    case 'Manager': {
      // Managers can only manage Employees for their cinemas
      if (adminUserRole === AdminRole.Employee) {
        // check if logged user has all the cinemas of added employee
        if (cinemaIds.every((id) => (loggedUser.cinemaIds as string[]).includes(id))) {
          return true;
        } else {
          throw new ForbiddenException('Not possible to manage Employee for cinemas you are not the Manager of');
        }
      } else {
        throw new ForbiddenException('Only SuperAdmin can manage SuperAdmin and Manager roles');
      }
    }
    case 'Employee':
      // Employees cannot manage admin users
      throw new ForbiddenException(FORBIDDEN_MESSAGE);
  }
}

@Controller('adminUsers')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Post()
  @Roles(AdminRole.Manager)
  @UseGuards(JwtAdminAuthGuard)
  create(@Body() createAdminUserDto: CreateAdminUserDto, @Req() req: ExpressRequestWithUser) {
    checkUserRolePermissions(req.user, createAdminUserDto.role, createAdminUserDto.cinemaIds);
    return this.adminUsersService.create(createAdminUserDto);
  }

  @Get()
  @Roles(AdminRole.Manager)
  @UseGuards(JwtAdminAuthGuard)
  async findAll(@Req() req: ExpressRequestWithUser, @Query('sort') sort?: string, @Query('range') range?: string) {
    return await this.adminUsersService.findAllForAdminUser(req.user, {
      sort: sort ? JSON.parse(sort) : undefined,
      range: range ? JSON.parse(range) : undefined,
    });
  }

  @Roles(AdminRole.Manager)
  @UseGuards(JwtAdminAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Req() req: ExpressRequestWithUser) {
    const adminUserSafe = await this.adminUsersService.findOne(id);
    if (adminUserSafe) {
      checkUserRolePermissions(req.user, adminUserSafe.role, adminUserSafe.cinemaIds as string[]);

      return adminUserSafe;
    }

    throw new NotFoundException();
  }

  // @Roles(AdminRole.Manager)
  // @UseGuards(JwtAdminAuthGuard)
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateAdminUserDto: UpdateAdminUserDto,
  // ) {
  //   return this.adminUsersService.update(+id, updateAdminUserDto);
  // }

  @Roles(AdminRole.SuperAdmin, AdminRole.Manager)
  @UseGuards(JwtAdminAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string, @Req() req: ExpressRequestWithUser) {
    const adminUserForDelete = await this.adminUsersService.findOne(id);
    if (!adminUserForDelete) {
      throw new NotFoundException();
    }

    // it is not possible to delete SuperAdmin
    if (adminUserForDelete.role === AdminRole.SuperAdmin) {
      throw new ForbiddenException('Cannot delete SuperAdmin');
    }

    // cannot delete yourself
    // it is not possible to delete SuperAdmin
    if (req.user.email === adminUserForDelete.email) {
      throw new ForbiddenException('Cannot delete yourself');
    }

    checkUserRolePermissions(
      req.user,
      adminUserForDelete.role,
      adminUserForDelete.cinemaIds as string[],
      adminUserForDelete.id,
    );

    return this.adminUsersService.remove(id);
  }
}
