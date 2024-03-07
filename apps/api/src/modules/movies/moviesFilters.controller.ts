import {Controller, Get, Query} from '@nestjs/common';
import {MoviesFiltersService} from './moviesFilters.service';
import {MovieFilterSearchDto} from './dto/movieFilterSearch.dto';

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

  @Get('searchFilter')
  searchFilter(@Query() params: MovieFilterSearchDto) {
    return this.moviesFiltersService.searchFilter(params);
  }
}
