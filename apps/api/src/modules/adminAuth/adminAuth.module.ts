import { Module } from '@nestjs/common';
import { AdminUserService } from './adminUser.service';
import { AdminAuthService } from './adminAuth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalAdminStrategy } from './strategies/localAdmin.strategy';
import { AdminAuthController } from './adminAuth.controller';

@Module({
  imports: [PassportModule],
  providers: [AdminUserService, AdminAuthService, LocalAdminStrategy],
  controllers: [AdminAuthController],
})
export class AdminAuthModule {}
