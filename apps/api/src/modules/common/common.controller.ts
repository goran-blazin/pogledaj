import { Controller, Get } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { EmailJobData } from '../email/email.types';

@Controller('/')
export class CommonController {
  constructor(
    @InjectQueue('email') private readonly emailQueue: Queue<EmailJobData>,
  ) {}

  @Get()
  main() {
    return `Welcome to pogledajApi - ${process.env.NODE_ENV} environment`;
  }

  @Get('monitoring')
  monitoring() {
    return {
      NODE_ENV: process.env.NODE_ENV,
      emailQueueConnected: this.emailQueue.client.status,
    };
  }
}
