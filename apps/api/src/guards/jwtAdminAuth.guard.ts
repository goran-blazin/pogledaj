import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { AdminRole } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ExpressRequestWithUser } from '../types/CommonTypes';

@Injectable()
export class JwtAdminAuthGuard extends AuthGuard('jwt-admin') {
  constructor(private reflector: Reflector) {
    super(reflector);
  }

  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);

    const requiredRoles = this.reflector.getAllAndOverride<AdminRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const req: ExpressRequestWithUser = context.switchToHttp().getRequest();

    if (req.user) {
      // super admin role has access to everything!
      if (req.user.role === AdminRole.SuperAdmin) {
        return true;
      }

      // if nothing is passed by default access is denied
      if (!requiredRoles) {
        return false;
      }

      return requiredRoles.some((role) => req.user.role === role);
    }

    return false;
  }
}
