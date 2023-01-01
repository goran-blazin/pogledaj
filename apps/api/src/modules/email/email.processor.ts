import { Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SendGridService } from './sendGrid.service';
import { EmailJobData } from './emailTypes';

@Processor('email')
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);
  constructor(private readonly sendGridService: SendGridService) {}

  @Process('supportEmail')
  async handleSendingEmail(job: Job<EmailJobData>) {
    const data = job.data;

    this.logger.debug(`Started sending ${data.emailType} emails...`);
    try {
      await this.sendGridService.sendNewEmail(data);
      this.logger.debug('Sending support emails completed');
    } catch (e) {
      this.logger.error(e);
    }
  }
}
