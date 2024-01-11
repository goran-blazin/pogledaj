import {
  Controller,
  Get,
  Post,
  // Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {PersonsService} from './persons.service';
// import { CreatePersonDto } from './dto/create-person.dto';
// import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  create() {
    // create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create();
  }

  @Get()
  findAll() {
    return this.personsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personsService.findOne(+id);
  }

  @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
  update(@Param('id') id: string) {
    return this.personsService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personsService.remove(+id);
  }
}
