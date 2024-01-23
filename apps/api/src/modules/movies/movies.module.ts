import {Module} from '@nestjs/common';
import {MoviesService} from './movies.service';
import {MoviesController} from './movies.controller';
import {TmdbProvider} from './tmdb.provider';
import {MoviesFiltersController} from './moviesFilters.controller';
import {MoviesFiltersService} from './moviesFilters.service';

@Module({
  controllers: [MoviesController, MoviesFiltersController],
  providers: [MoviesService, TmdbProvider, MoviesFiltersService],
})
export class MoviesModule {}
