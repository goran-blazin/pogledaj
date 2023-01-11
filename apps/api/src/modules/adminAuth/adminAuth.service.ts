import { Injectable } from '@nestjs/common';
import { AdminUserService } from './adminUser.service';
import { AdminUserSafe } from '../../types/CommonTypes';
import * as _ from 'lodash';

@Injectable()
export class AdminAuthService {
  constructor(private adminUserService: AdminUserService) {}

  async validateAdminUser(
    email: string,
    password: string,
  ): Promise<AdminUserSafe | null> {
    const adminUser = await this.adminUserService.findByEmail(email);
    if (adminUser && adminUser.password === password) {
      // set cookies
      return _.omit(adminUser, ['password']);
    }

    return null;
  }
}
