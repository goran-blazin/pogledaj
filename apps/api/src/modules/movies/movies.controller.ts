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
import {MoviesService} from './movies.service';
import {JwtAdminAuthGuard} from '../../guards/jwtAdminAuth.guard';
import {Roles} from '../../decorators/roles.decorator';
import {AdminRole} from '@prisma/client';
import {UpsertFromExternalDto} from './dto/upsertFromExternal.dto';

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
    @Query('includePersons', new DefaultValuePipe(false), ParseBoolPipe) includePersons: boolean,
    @Query('onlyWithActiveProjections', new DefaultValuePipe(false), ParseBoolPipe) onlyWithActiveProjections: boolean,
    @Query('sort') sort?: string,
    @Query('range') range?: string,
  ) {
    return this.moviesService.findAll(
      {
        sort: sort ? JSON.parse(sort) : undefined,
        range: range ? JSON.parse(range) : undefined,
      },
      {includePersons, onlyWithActiveProjections},
    );
  }

  @Get('soon')
  findSoon() {
    return this.moviesService.findSoon();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('includePersons', new DefaultValuePipe(false), ParseBoolPipe) includePersons: boolean,
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

  // @Roles(AdminRole.SuperAdmin)
  // @UseGuards(JwtAdminAuthGuard)
  // @Delete(':id')
  // remove(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.moviesService.remove(id);
  // }

  @Roles(AdminRole.SuperAdmin)
  @UseGuards(JwtAdminAuthGuard)
  @Post('upsertFromExternal')
  upsertFromExternal(@Body() upsertFromExternalDto: UpsertFromExternalDto) {
    return this.moviesService.upsertFromExternal(upsertFromExternalDto.externalType, upsertFromExternalDto.externalId, {
      localizedTitle: upsertFromExternalDto.localizedTitle,
      localizedPlot: upsertFromExternalDto.localizedPlot,
    });
  }
}
