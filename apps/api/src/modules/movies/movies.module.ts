import {Module} from '@nestjs/common';
import {MoviesService} from './movies.service';
import {MoviesController} from './movies.controller';
import {TmdbProvider} from './tmdb.provider';
import {MoviesFiltersController} from './moviesFilters.controller';
import {MoviesFiltersService} from './moviesFilters.service';
import {QueuesDefinition} from '../../helpers/QueuesHelper';
import {AutomaticDataInsertMoviesProcessor} from './automaticDataInsertMovies.processor';
import {BullModule} from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueuesDefinition.INSERT_MOVIES.name,
    }),
  ],
  controllers: [MoviesController, MoviesFiltersController],
  providers: [MoviesService, TmdbProvider, MoviesFiltersService, AutomaticDataInsertMoviesProcessor],
})
export class MoviesModule {}
