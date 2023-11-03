import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CinemaTheatersService } from './cinemaTheaters.service';
import { JwtAdminAuthGuard } from '../../guards/jwtAdminAuth.guard';
import { CreateCinemaTheaterDto } from './dto/createCinemaTheater.dto';

@Controller('cinemaTheaters')
export class CinemaTheatersController {
  constructor(private readonly cinemaTheatersService: CinemaTheatersService) {}

  @Get()
  findAll(
    @Query('sort') sort?: string,
    @Query('range') range?: string,
    @Query('filter') filter?: string,
  ) {
    return this.cinemaTheatersService.findAll({
      sort: sort ? JSON.parse(sort) : undefined,
      range: range ? JSON.parse(range) : undefined,
      filter: filter ? JSON.parse(filter) : undefined,
    });
  }

  @Get('/cinema/:cinemaId')
  findAllByCinema(
    @Param('cinemaId') cinemaId: string,
    @Query('sort') sort?: string,
    @Query('range') range?: string,
    @Query('filter') filter?: string,
  ) {
    return this.cinemaTheatersService.findAll({
      sort: sort ? JSON.parse(sort) : undefined,
      range: range ? JSON.parse(range) : undefined,
      filter: {
        cinemaId,
        ...(filter ? JSON.parse(filter) : {}),
      },
    });
  }

  @Post()
  @UseGuards(JwtAdminAuthGuard)
  createCinemaTheater(@Body() createCinemaTheaterDto: CreateCinemaTheaterDto) {
    return this.cinemaTheatersService.create(createCinemaTheaterDto);
  }

  @Delete('/:cinemaTheaterId')
  @UseGuards(JwtAdminAuthGuard)
  deleteCinemaTheater(@Param('cinemaTheaterId') cinemaTheaterId: string) {
    return this.cinemaTheatersService.delete(cinemaTheaterId);
  }
}
