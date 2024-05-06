import {QueuesDefinition} from '../../helpers/QueuesHelper';
import {Logger, OnModuleInit} from '@nestjs/common';
import {Job, Queue} from 'bullmq';
import {InjectQueue, OnWorkerEvent, Processor, WorkerHost} from '@nestjs/bullmq';
import {MovieProjectionsService} from './movieProjections.service';

@Processor(QueuesDefinition.INSERT_MOVIE_PROJECTIONS.name)
export class AutomaticDataInsertMovieProjectionsProcessor extends WorkerHost implements OnModuleInit {
  private readonly logger = new Logger(QueuesDefinition.INSERT_MOVIE_PROJECTIONS.name);

  constructor(
    private readonly movieProjectionsService: MovieProjectionsService,
    @InjectQueue(QueuesDefinition.INSERT_MOVIE_PROJECTIONS.name) private readonly insertMovieProjectionsQueue: Queue,
  ) {
    super();
  }

  async onModuleInit() {
    // Get all repeatable jobs
    const repeatableJobs = await this.insertMovieProjectionsQueue.getRepeatableJobs();
    // Iterate over the jobs and remove each one
    for (const job of repeatableJobs) {
      await this.insertMovieProjectionsQueue.removeRepeatableByKey(job.key);
    }

    if (process.env.NODE_ENV === 'test') {
      await this.insertMovieProjectionsQueue.add(
        QueuesDefinition.INSERT_MOVIE_PROJECTIONS.jobId,
        {},
        {
          repeat: {
            pattern: '0 6 * * *',
          },
          jobId: QueuesDefinition.INSERT_MOVIE_PROJECTIONS.jobId, // Ensure the job ID is unique to prevent multiple instances
        },
      );
    }
  }

  async process(job: Job) {
    this.logger.debug(`Started job ${job.name} in queue ${QueuesDefinition.INSERT_MOVIE_PROJECTIONS.name}...`);

    await this.movieProjectionsService.generateDemoProjections();
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.debug(`Completed job ${job.name} in queue ${QueuesDefinition.INSERT_MOVIE_PROJECTIONS.name}`);
  }
}
