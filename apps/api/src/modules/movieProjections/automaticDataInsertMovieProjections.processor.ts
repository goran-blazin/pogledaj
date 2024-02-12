import {QueuesDefinition} from '../../helpers/QueuesHelper';
import {Logger} from '@nestjs/common';
import {Job} from 'bullmq';
import {OnWorkerEvent, Processor, WorkerHost} from '@nestjs/bullmq';
import {MovieProjectionsService} from './movieProjections.service';

@Processor(QueuesDefinition.INSERT_MOVIE_PROJECTIONS.name)
export class AutomaticDataInsertMovieProjectionsProcessor extends WorkerHost {
  private readonly logger = new Logger(QueuesDefinition.INSERT_MOVIE_PROJECTIONS.name);

  constructor(private readonly movieProjectionsService: MovieProjectionsService) {
    super();
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
