import { Controller, Get, Query } from '@nestjs/common';
import { CinemaTheatersService } from './cinemaTheaters.service';

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
}
