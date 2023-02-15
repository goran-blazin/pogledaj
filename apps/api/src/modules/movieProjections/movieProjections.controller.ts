import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MovieProjectionsService } from './movieProjections.service';
import { JwtAdminAuthGuard } from '../../guards/jwtAdminAuth.guard';
import { Roles } from '../../decorators/roles.decorator';
import { AdminRole } from '@prisma/client';
import { CreateMovieProjectionDto } from './dto/createMovieProjection.dto';
import { ExpressRequestWithUser } from '../../types/CommonTypes';

@Controller('movieProjections')
export class MovieProjectionsController {
  constructor(
    private readonly movieProjectionsService: MovieProjectionsService,
  ) {}

  @Get('/movie/:movieId/cinema/:cinemaId')
  async findAllPerMovieCinema(
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @Param('cinemaId', ParseUUIDPipe) cinemaId: string,
    @Query('sort') sort?: string,
    @Query('range') range?: string,
  ) {
    return this.movieProjectionsService.findAll(
      {
        movieId,
        cinemaId,
      },
      {
        sort: sort ? JSON.parse(sort) : undefined,
        range: range ? JSON.parse(range) : undefined,
      },
    );
  }

  @Get('/movie/:movieId')
  async findAllPerMovie(
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @Query('sort') sort?: string,
    @Query('range') range?: string,
  ) {
    return this.movieProjectionsService.findAll(
      {
        movieId,
      },
      {
        sort: sort ? JSON.parse(sort) : undefined,
        range: range ? JSON.parse(range) : undefined,
      },
    );
  }

  @Get('/cinema/:cinemaId')
  async findAllPerCinema(
    @Param('cinemaId', ParseUUIDPipe) cinemaId: string,
    @Query('sort') sort?: string,
    @Query('range') range?: string,
  ) {
    return this.movieProjectionsService.findAll(
      {
        cinemaId,
      },
      {
        sort: sort ? JSON.parse(sort) : undefined,
        range: range ? JSON.parse(range) : undefined,
      },
    );
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

  @UseGuards(JwtAdminAuthGuard)
  @Roles(AdminRole.SuperAdmin, AdminRole.Manager)
  @Post('/')
  async createMovieProjection(
    @Body() createMovieProjection: CreateMovieProjectionDto,
    @Req() req: ExpressRequestWithUser,
  ) {
    return this.movieProjectionsService.createByUser(
      createMovieProjection,
      req.user,
    );
  }
}
