import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
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
  findAll() {
    return this.cinemasService.findAll();
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
