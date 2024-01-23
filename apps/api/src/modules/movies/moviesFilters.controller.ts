import {Controller, DefaultValuePipe, Get, ParseIntPipe, Query} from '@nestjs/common';
import {MoviesFiltersService} from './moviesFilters.service';

@Controller('moviesFilters')
export class MoviesFiltersController {
  constructor(private readonly moviesFiltersService: MoviesFiltersService) {}

  @Get('getAllGenres')
  getGenres() {
    return this.moviesFiltersService.getGenres();
  }

  @Get('getAllCountries')
  getCountries() {
    return this.moviesFiltersService.getCountriesWithMovies();
  }
}
