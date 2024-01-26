import {Controller, Get, Post, Param, ParseUUIDPipe, Query, Body, UseGuards, Delete} from '@nestjs/common';
import {CinemasService} from './cinemas.service';
import {CreateCinemaDto} from './dto/createCinema.dto';
import {JwtAdminAuthGuard} from '../../guards/jwtAdminAuth.guard';
import {Roles} from '../../decorators/roles.decorator';
import {AdminRole} from '@prisma/client';

@Controller('cinemas')
export class CinemasController {
  constructor(private readonly cinemasService: CinemasService) {}

  @Roles(AdminRole.SuperAdmin)
  @UseGuards(JwtAdminAuthGuard)
  @Post()
  create(@Body() createCinemaDto: CreateCinemaDto) {
    return this.cinemasService.create(createCinemaDto);
  }

  @Get()
  async findAll(@Query('sort') sort?: string, @Query('range') range?: string, @Query('filter') filter?: string) {
    return this.cinemasService.findAll({
      sort: sort ? JSON.parse(sort) : undefined,
      range: range ? JSON.parse(range) : undefined,
      filter: filter ? JSON.parse(filter) : undefined,
    });
  }

  @Get('findByCity/:cityId')
  findAllByCity(@Param('cityId', ParseUUIDPipe) cityId: string) {
    return this.cinemasService.findAllByCityId(cityId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.cinemasService.findOne({
      id: id,
    });
  }

  // @Patch(':id')
  // // update(@Param('id') id: string, @Body() updateCinemaDto: UpdateCinemaDto) {
  // update(@Param('id') id: string) {
  //   return this.cinemasService.update(+id);
  // }
  //
  @UseGuards(JwtAdminAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cinemasService.remove(id);
  }
}
