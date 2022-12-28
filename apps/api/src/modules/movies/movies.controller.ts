import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { MovieEntity } from './entities/movie.entity';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @ApiOkResponse({ type: [MovieEntity] })
  @Get()
  findAll(
    @Query('includePersons', new DefaultValuePipe(false), ParseBoolPipe)
    includePersons: boolean,
  ) {
    return this.moviesService.findAll({}, { includePersons });
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('includePersons', new DefaultValuePipe(false), ParseBoolPipe)
    includePersons: boolean,
  ) {
    return this.moviesService.findOne(
      {
        id: id,
      },
      {
        includePersons,
      },
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update({
      where: {
        id: id,
      },
      data: updateMovieDto,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.remove({
      id: id,
    });
  }
}
