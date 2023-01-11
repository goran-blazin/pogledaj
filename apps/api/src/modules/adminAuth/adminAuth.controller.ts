import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAdminAuthGuard } from './guards/localAdminAuth.guard';
import { ExpressRequestWithUser } from '../../types/CommonTypes';

@Controller('admin/auth')
export class AdminAuthController {
  @UseGuards(LocalAdminAuthGuard)
  @Post('local')
  async adminLocalLogin(@Request() req: ExpressRequestWithUser) {
    // eslint-disable-next-line no-console
    console.log(req.user.fullName);
    return true;
  }
}
