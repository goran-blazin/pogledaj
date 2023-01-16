import { Module } from '@nestjs/common';
import { AdminUsersService } from './adminUsers.service';
import { AdminUsersController } from './adminUsers.controller';
import { AdminUserExistsRule } from './dto/adminUserExistsRule';
import {
  ValidateCinemaExistence,
  ValidateCinemaForPassedRole,
} from './dto/validateCinemaIdsRules';

@Module({
  controllers: [AdminUsersController],
  providers: [
    AdminUsersService,
    AdminUserExistsRule,
    ValidateCinemaExistence,
    ValidateCinemaForPassedRole,
  ],
  exports: [AdminUsersService],
})
export class AdminUsersModule {}
