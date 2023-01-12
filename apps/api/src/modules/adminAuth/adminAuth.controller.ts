import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { LocalAdminAuthGuard } from './guards/localAdminAuth.guard';
import { ExpressRequestWithUser } from '../../types/CommonTypes';
import { AdminAuthService } from './adminAuth.service';
import { JwtAdminAuthGuard } from './guards/jwtAdminAuth.guard';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @UseGuards(LocalAdminAuthGuard)
  @Post('local')
  async adminLocalLogin(@Request() req: ExpressRequestWithUser) {
    // return JWT token
    return this.adminAuthService.loginAdminUser(req.user);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get('profile')
  getProfile(@Request() req: ExpressRequestWithUser) {
    return req.user;
  }
}
