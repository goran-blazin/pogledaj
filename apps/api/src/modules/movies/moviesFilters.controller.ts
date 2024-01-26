import {Controller, Get} from '@nestjs/common';
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

  @Get('getAllCitiesWithCinemas')
  getAllCitiesWithCinemas() {
    return this.moviesFiltersService.getAllCitiesWithCinemas();
  }
}
