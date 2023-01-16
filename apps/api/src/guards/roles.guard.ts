import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AdminRole } from '@prisma/client';
import { ExpressRequestWithUser } from '../types/CommonTypes';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<AdminRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const req: ExpressRequestWithUser = context.switchToHttp().getRequest();

    if (req.user) {
      // super admin role has access to everything!
      if (req.user.role === AdminRole.SuperAdmin) {
        return true;
      }

      return requiredRoles.some((role) => req.user.role === role);
    }

    return false;
  }
}
