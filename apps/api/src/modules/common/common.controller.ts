import {Controller, Get} from '@nestjs/common';
import {EmailJobData} from '../email/email.types';
import {QueuesDefinition} from '../../helpers/QueuesHelper';
import {InjectQueue} from '@nestjs/bullmq';
import {Queue} from 'bullmq';

@Controller('/')
export class CommonController {
  constructor(
    @InjectQueue(QueuesDefinition.EMAIL.name) private readonly emailQueue: Queue<EmailJobData>,
    @InjectQueue(QueuesDefinition.INSERT_MOVIES.name) private readonly insertMoviesQueue: Queue,
  ) {}

  @Get()
  main() {
    return `Welcome to pogledajApi - ${process.env.NODE_ENV} environment`;
  }

  @Get('monitoring')
  async monitoring() {
    return {
      NODE_ENV: process.env.NODE_ENV,
      QueueStatus: {
        [QueuesDefinition.EMAIL.name]: (await this.emailQueue.client).status,
        [QueuesDefinition.INSERT_MOVIES.name]: (await this.insertMoviesQueue.client).status,
      },
    };
  }
}
