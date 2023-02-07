import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MovieProjectionsService } from './movieProjections.service';
import { JwtAdminAuthGuard } from '../../guards/jwtAdminAuth.guard';
import { Roles } from '../../decorators/roles.decorator';
import { AdminRole } from '@prisma/client';

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

  @UseGuards(JwtAdminAuthGuard)
  @Roles(AdminRole.SuperAdmin)
  @Post('/generate')
  async generateMovieProjections(
    @Body('days', new DefaultValuePipe(30), ParseIntPipe) days: number,
    @Body('movieId', ParseUUIDPipe) movieId: string,
    @Body('cinemaId', ParseUUIDPipe) cinemaId: string,
  ) {
    return this.movieProjectionsService.generateSingleMovieSingleCinema(
      days,
      movieId,
      cinemaId,
    );
  }
}
