import {Logger} from '@nestjs/common';
import {SendGridService} from './sendGrid.service';
import {EmailJobData} from './email.types';
import {Job} from 'bullmq';
import {QueuesDefinition} from '../../helpers/QueuesHelper';
import {OnWorkerEvent, Processor, WorkerHost} from '@nestjs/bullmq';

@Processor(QueuesDefinition.EMAIL.name)
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);
  constructor(private readonly sendGridService: SendGridService) {
    super();
  }

  process(job: Job<EmailJobData>) {
    const data = job.data;

    this.logger.debug(`Started sending ${data.emailType} emails...`);

    return this.sendGridService.sendNewEmail(data);
  }

  @OnWorkerEvent('error')
  onFailed(failedReason: Error) {
    this.logger.error(failedReason);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<EmailJobData>) {
    this.logger.debug(`Sending ${job.data.emailType} emails completed`);
  }
}
