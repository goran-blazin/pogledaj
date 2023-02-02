import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
  ParseUUIDPipe,
  UseGuards,
  Body,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
// import { CreateMovieDto } from './dto/create-movie.dto';
// import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAdminAuthGuard } from '../../guards/jwtAdminAuth.guard';
import { Roles } from '../../decorators/roles.decorator';
import { AdminRole } from '@prisma/client';
import { UpsertFromExternalDto } from './dto/upsertFromExternal.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // @UseGuards(JwtAdminAuthGuard)
  // @Post()
  // create(@Body() createMovieDto: CreateMovieDto) {
  //   return this.moviesService.create(createMovieDto);
  // }

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

  // @UseGuards(JwtAdminAuthGuard)
  // @Patch(':id')
  // update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updateMovieDto: UpdateMovieDto,
  // ) {
  //   return this.moviesService.update({
  //     where: {
  //       id: id,
  //     },
  //     data: updateMovieDto,
  //   });
  // }

  // @UseGuards(JwtAdminAuthGuard)
  // @Delete(':id')
  // remove(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.moviesService.remove({
  //     id: id,
  //   });
  // }

  @UseGuards(JwtAdminAuthGuard)
  @Post('upsertFromExternal')
  @Roles(AdminRole.SuperAdmin)
  upsertFromExternal(@Body() upsertFromExternalDto: UpsertFromExternalDto) {
    return this.moviesService.upsertFromExternal(
      upsertFromExternalDto.externalType,
      upsertFromExternalDto.externalId,
      {
        localizedTitle: upsertFromExternalDto.localizedTitle,
        localizedPlot: upsertFromExternalDto.localizedPlot,
      },
    );
  }
}
