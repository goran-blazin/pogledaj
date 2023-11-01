import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CinemasService } from './cinemas.service';
// import { CreateCinemaDto } from './dto/create-cinema.dto';
// import { UpdateCinemaDto } from './dto/update-cinema.dto';

@Controller('cinemas')
export class CinemasController {
  constructor(private readonly cinemasService: CinemasService) {}

  @Post()
  // create(@Body() createCinemaDto: CreateCinemaDto) {
  create() {
    return this.cinemasService.create();
  }

  @Get()
  async findAll(
    @Query('sort') sort?: string,
    @Query('range') range?: string,
    @Query('filter') filter?: string,
  ) {
    return this.cinemasService.findAll({
      sort: sort ? JSON.parse(sort) : undefined,
      range: range ? JSON.parse(range) : undefined,
      filter: filter ? JSON.parse(filter) : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.cinemasService.findOne({
      id: id,
    });
  }

  @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCinemaDto: UpdateCinemaDto) {
  update(@Param('id') id: string) {
    return this.cinemasService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cinemasService.remove(+id);
  }
}
