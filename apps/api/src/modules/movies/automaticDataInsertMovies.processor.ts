import {QueuesDefinition} from '../../helpers/QueuesHelper';
import {Logger} from '@nestjs/common';
import {MoviesService} from './movies.service';
import {Job} from 'bullmq';
import {OnWorkerEvent, Processor, WorkerHost} from '@nestjs/bullmq';

@Processor(QueuesDefinition.INSERT_MOVIES.name)
export class AutomaticDataInsertMoviesProcessor extends WorkerHost {
  private readonly logger = new Logger(QueuesDefinition.INSERT_MOVIES.name);

  constructor(private readonly moviesService: MoviesService) {
    super();
  }

  async process(job: Job) {
    this.logger.debug(`Started job ${job.name} in queue ${QueuesDefinition.INSERT_MOVIES.name}...`);

    switch (job.name) {
      case QueuesDefinition.INSERT_MOVIES.jobs.INSERT_NEW_POPULAR_MOVIES:
        await this.moviesService.upsertNewPopularMovies();
        break;
    }
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.debug(`Completed job ${job.name} in queue ${QueuesDefinition.INSERT_MOVIES.name}`);
  }
}
