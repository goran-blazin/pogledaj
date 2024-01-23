import {Controller, DefaultValuePipe, Get, ParseIntPipe, Query} from '@nestjs/common';
import {PersonsService} from './persons.service';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get('searchActorsByName')
  searchActorsByName(
    @Query('searchText') searchText: string,
    @Query('take', new DefaultValuePipe(5), ParseIntPipe) take: number,
  ) {
    return this.personsService.searchActorsByName({
      searchText,
      take,
    });
  }

  @Get('searchDirectorsByName')
  searchDirectorsByName(
    @Query('searchText') searchText: string,
    @Query('take', new DefaultValuePipe(5), ParseIntPipe) take: number,
  ) {
    return this.personsService.searchDirectorsByName({
      searchText,
      take,
    });
  }
}
