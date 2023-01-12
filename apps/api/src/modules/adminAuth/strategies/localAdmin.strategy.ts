import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminAuthService } from '../adminAuth.service';
import { AdminUserSafe } from '../../../types/CommonTypes';

@Injectable()
export class LocalAdminStrategy extends PassportStrategy(
  Strategy,
  'local-admin',
) {
  constructor(private adminAuthService: AdminAuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<AdminUserSafe> {
    const adminUser = await this.adminAuthService.validateAdminUserForLocal(
      email,
      password,
    );
    if (!adminUser) {
      throw new UnauthorizedException();
    }
    return adminUser;
  }
}
