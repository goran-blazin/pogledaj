import {Controller, Get} from '@nestjs/common';
import {EmailJobData} from '../email/email.types';
import {QueuesDefinition} from '../../helpers/QueuesHelper';
import {InjectQueue} from '@nestjs/bullmq';
import {Queue} from 'bullmq';
import {DateTime} from 'ts-luxon';

@Controller('/')
export class CommonController {
  constructor(
    @InjectQueue(QueuesDefinition.EMAIL.name) private readonly emailQueue: Queue<EmailJobData>,
    @InjectQueue(QueuesDefinition.INSERT_MOVIES.name) private readonly insertMoviesQueue: Queue,
    @InjectQueue(QueuesDefinition.INSERT_MOVIE_PROJECTIONS.name) private readonly insertMovieProjectionsQueue: Queue,
  ) {}

  @Get()
  main() {
    return `Welcome to pogledajApi - ${process.env.NODE_ENV} environment`;
  }

  @Get('monitoring')
  async monitoring() {
    const insertMoviesRepeatableJob = (await this.insertMoviesQueue.getRepeatableJobs())[0];
    const insertMovieProjectionsRepeatableJob = (await this.insertMovieProjectionsQueue.getRepeatableJobs())[0];

    return {
      NODE_ENV: process.env.NODE_ENV,
      QueueStatus: {
        [QueuesDefinition.EMAIL.name]: {
          queueStatus: (await this.emailQueue.client).status,
          jobsWaitingCount: await this.emailQueue.getWaitingCount(),
          jobsFailedCount: await this.emailQueue.getFailedCount(),
        },
        [QueuesDefinition.INSERT_MOVIES.name]: {
          queueStatus: (await this.insertMoviesQueue.client).status,
          repeatableJobActive: !!insertMoviesRepeatableJob,
          nextTrigger: insertMoviesRepeatableJob
            ? DateTime.fromMillis(insertMoviesRepeatableJob.next).toISO()
            : 'Never',
        },
        [QueuesDefinition.INSERT_MOVIE_PROJECTIONS.name]: {
          queueStatus: (await this.insertMovieProjectionsQueue.client).status,
          repeatableJobActive: !!insertMovieProjectionsRepeatableJob,
          nextTrigger: insertMovieProjectionsRepeatableJob
            ? DateTime.fromMillis(insertMovieProjectionsRepeatableJob.next).toISO()
            : 'Never',
        },
      },
    };
  }
}
