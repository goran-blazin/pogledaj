import { Module } from '@nestjs/common';
import { AdminUsersService } from './adminUsers.service';
import { AdminUsersController } from './adminUsers.controller';

@Module({
  controllers: [AdminUsersController],
  providers: [AdminUsersService],
  exports: [AdminUsersService],
})
export class AdminUsersModule {}
