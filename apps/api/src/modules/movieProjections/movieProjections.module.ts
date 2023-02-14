import { Module } from '@nestjs/common';
import { MovieProjectionsService } from './movieProjections.service';
import { MovieProjectionsController } from './movieProjections.controller';
import { MoviesModule } from '../movies/movies.module';
import { CinemasModule } from '../cinemas/cinemas.module';
import { MovieExistsRule } from '../movies/dto/movieExistsRule';
import { CinemaTheaterExistsRule } from '../cinemas/dto/cinemaTheaterExistsRule';

@Module({
  imports: [MoviesModule, CinemasModule],
  controllers: [MovieProjectionsController],
  providers: [
    MovieProjectionsService,
    MovieExistsRule,
    CinemaTheaterExistsRule,
  ],
  exports: [],
})
export class MovieProjectionsModule {}
