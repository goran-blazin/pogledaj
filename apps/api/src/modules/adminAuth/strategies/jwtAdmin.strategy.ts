import {AdminUserJwtPayload, AdminUserSafe} from '../../../types/CommonTypes';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import process from 'process';
import {AdminAuthService} from '../adminAuth.service';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(private adminAuthService: AdminAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_ADMIN_USER_JWT_SECRET,
    });
  }

  async validate(payload: AdminUserJwtPayload): Promise<AdminUserSafe> {
    const adminUser = await this.adminAuthService.validateAdminUser(payload.email);

    if (!adminUser) {
      throw new UnauthorizedException();
    }
    return adminUser;
  }
}
