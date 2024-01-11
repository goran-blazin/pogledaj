import {Module} from '@nestjs/common';
import {AdminAuthService} from './adminAuth.service';
import {PassportModule} from '@nestjs/passport';
import {LocalAdminStrategy} from './strategies/localAdmin.strategy';
import {AdminAuthController} from './adminAuth.controller';
import {AdminUsersModule} from '../adminUsers/adminUsers.module';
import {JwtModule} from '@nestjs/jwt';
import {JwtAdminStrategy} from './strategies/jwtAdmin.strategy';

@Module({
  imports: [PassportModule, AdminUsersModule, JwtModule],
  providers: [AdminAuthService, LocalAdminStrategy, JwtAdminStrategy],
  controllers: [AdminAuthController],
})
export class AdminAuthModule {}
