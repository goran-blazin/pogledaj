import {Body, Controller, Post} from '@nestjs/common';
import {SupportEmailDto} from './dto/supportEmail.dto';
import {EmailService} from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('support')
  async supportEmail(@Body() supportEmailDto: SupportEmailDto) {
    await this.emailService.sendSupportEmail(supportEmailDto);

    return true;
  }
}
