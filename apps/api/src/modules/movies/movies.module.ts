import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TmdbProvider } from './tmdb.provider';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, TmdbProvider],
})
export class MoviesModule {}
