import {Module} from '@nestjs/common';
import {MovieProjectionsService} from './movieProjections.service';
import {MovieProjectionsController} from './movieProjections.controller';
import {MoviesModule} from '../movies/movies.module';
import {CinemasModule} from '../cinemas/cinemas.module';
import {MovieExistsRule} from '../movies/dto/movieExistsRule';
import {CinemaTheaterExistsRule} from '../cinemas/dto/cinemaTheaterExistsRule';
import {AutomaticDataInsertMovieProjectionsProcessor} from './automaticDataInsertMovieProjections.processor';
import {BullModule} from '@nestjs/bullmq';
import {QueuesDefinition} from '../../helpers/QueuesHelper';

@Module({
  imports: [
    MoviesModule,
    CinemasModule,
    BullModule.registerQueue({
      name: QueuesDefinition.INSERT_MOVIE_PROJECTIONS.name,
    }),
  ],
  controllers: [MovieProjectionsController],
  providers: [
    MovieProjectionsService,
    MovieExistsRule,
    CinemaTheaterExistsRule,
    AutomaticDataInsertMovieProjectionsProcessor,
  ],
  exports: [],
})
export class MovieProjectionsModule {}
