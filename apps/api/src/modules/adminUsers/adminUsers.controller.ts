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
} from '@nestjs/common';
import { AdminUsersService } from './adminUsers.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
// import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { AdminRole } from '@prisma/client';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { JwtAdminAuthGuard } from '../../guards/jwtAdminAuth.guard';
import { AdminUserSafe, ExpressRequestWithUser } from '../../types/CommonTypes';
import { FORBIDDEN_MESSAGE } from '@nestjs/core/guards';

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
      // Managers can only add Employees for their cinemas
      if (adminUserRole === AdminRole.Employee) {
        // check if logged user has all the cinemas of added employee
        if (
          cinemaIds.every((id) =>
            (loggedUser.cinemaIds as string[]).includes(id),
          )
        ) {
          return true;
        } else {
          throw new ForbiddenException(
            'Not possible to manage Employee for cinemas you are not the Manager of',
          );
        }
      } else {
        throw new ForbiddenException(
          'Only SuperAdmin can manage SuperAdmin and Manager roles',
        );
      }
    }
    case 'Employee':
      // Employees cannot add admin users
      throw new ForbiddenException(FORBIDDEN_MESSAGE);
  }
}

@Controller('adminUsers')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Post()
  @Roles(AdminRole.Manager)
  @UseGuards(JwtAdminAuthGuard, RolesGuard)
  create(
    @Body() createAdminUserDto: CreateAdminUserDto,
    @Req() req: ExpressRequestWithUser,
  ) {
    checkUserRolePermissions(
      req.user,
      createAdminUserDto.role,
      createAdminUserDto.cinemaIds,
    );
    return this.adminUsersService.create(createAdminUserDto);
  }

  @Get()
  @Roles(AdminRole.SuperAdmin)
  @UseGuards(JwtAdminAuthGuard, RolesGuard)
  findAll(@Req() req: ExpressRequestWithUser) {
    if (req.user.role === AdminRole.SuperAdmin) {
      return this.adminUsersService.findAll();
    }
  }

  @Get('/cinema/:cinemaId')
  @Roles(AdminRole.Manager)
  @UseGuards(JwtAdminAuthGuard, RolesGuard)
  findAllEmployeesForCinema(
    @Req() req: ExpressRequestWithUser,
    @Param('cinemaId', ParseUUIDPipe) cinemaId: string,
  ) {
    if (req.user.role === AdminRole.SuperAdmin) {
      return this.adminUsersService.findAllEmployeesForCinema(cinemaId);
    }
  }

  // @Roles(AdminRole.Manager)
  // @UseGuards(JwtAdminAuthGuard, RolesGuard)
  // @Get(':id')
  // findOne(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.adminUsersService.findOne(id);
  // }

  // @Roles(AdminRole.Manager)
  // @UseGuards(JwtAdminAuthGuard, RolesGuard)
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateAdminUserDto: UpdateAdminUserDto,
  // ) {
  //   return this.adminUsersService.update(+id, updateAdminUserDto);
  // }

  @Roles(AdminRole.SuperAdmin)
  @UseGuards(JwtAdminAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminUsersService.remove(id);
  }
}
