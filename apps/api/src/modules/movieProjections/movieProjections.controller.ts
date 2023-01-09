import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { MovieProjectionsService } from './movieProjections.service';

@Controller('movieProjections')
export class MovieProjectionsController {
  constructor(
    private readonly movieProjectionsService: MovieProjectionsService,
  ) {}

  @Get('/movie/:movieId/cinema/:cinemaId')
  async findAllPerMovieCinema(
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @Param('cinemaId', ParseUUIDPipe) cinemaId: string,
  ) {
    return this.movieProjectionsService.findPerMovieCinema(movieId, cinemaId);
  }

  @Get('/movie/:movieId')
  async findAllPerMovie(@Param('movieId', ParseUUIDPipe) movieId: string) {
    return this.movieProjectionsService.findPerMovie(movieId);
  }

  @Get('/cinema/:cinemaId')
  async findAllPerCinema(@Param('cinemaId', ParseUUIDPipe) cinemaId: string) {
    return this.movieProjectionsService.findPerCinema(cinemaId);
  }

  @Post('/generate')
  async generateMovieProjections(
    @Body('days', new DefaultValuePipe(30), ParseIntPipe) days: number,
  ) {
    return this.movieProjectionsService.generate(days);
  }
}
