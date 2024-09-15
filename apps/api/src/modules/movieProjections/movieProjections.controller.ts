import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {MovieProjectionsService} from './movieProjections.service';
import {JwtAdminAuthGuard} from '../../guards/jwtAdminAuth.guard';
import {Roles} from '../../decorators/roles.decorator';
import {AdminRole} from '@prisma/client';
import {CreateMovieProjectionDto} from './dto/createMovieProjection.dto';
import {ExpressRequestWithUser} from '../../types/CommonTypes';
import {EditMovieProjectionDto} from './dto/editMovieProjection.dto';

@Controller('movieProjections')
export class MovieProjectionsController {
  constructor(private readonly movieProjectionsService: MovieProjectionsService) {}

  @Get('/movie/:movieId/cinema/:cinemaId')
  async findAllPerMovieCinema(
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @Param('cinemaId', ParseUUIDPipe) cinemaId: string,
    @Query('includeArchived', new DefaultValuePipe(false), ParseBoolPipe)
    includeArchived?: boolean,
    @Query('sort') sort?: string,
    @Query('range') range?: string,
  ) {
    return this.movieProjectionsService.findAll(
      {
        movieId,
        cinemaId,
        includeArchived: includeArchived === true,
      },
      {
        sort: sort ? JSON.parse(sort) : undefined,
        range: range ? JSON.parse(range) : undefined,
      },
    );
  }

  @Get('/movie/:movieId')
  async findAllPerMovie(
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @Query('includeArchived', new DefaultValuePipe(false), ParseBoolPipe)
    includeArchived?: boolean,
    @Query('sort') sort?: string,
    @Query('range') range?: string,
  ) {
    return this.movieProjectionsService.findAll(
      {
        movieId,
        includeArchived: includeArchived === true,
      },
      {
        sort: sort ? JSON.parse(sort) : undefined,
        range: range ? JSON.parse(range) : undefined,
      },
    );
  }

  @Get('/cinema/:cinemaId')
  async findAllPerCinema(
    @Param('cinemaId', ParseUUIDPipe) cinemaId: string,
    @Query('includeArchived', new DefaultValuePipe(false), ParseBoolPipe)
    includeArchived?: boolean,
    @Query('sort') sort?: string,
    @Query('range') range?: string,
    @Query('filter') filter?: string,
  ) {
    return this.movieProjectionsService.findAll(
      {
        cinemaId,
        includeArchived: includeArchived === true,
      },
      {
        sort: sort ? JSON.parse(sort) : undefined,
        range: range ? JSON.parse(range) : undefined,
        filter: filter ? JSON.parse(filter) : undefined,
      },
    );
  }

  @Roles(AdminRole.SuperAdmin)
  @UseGuards(JwtAdminAuthGuard)
  @Post('/generate')
  async generateMovieProjections(
    @Body('days', new DefaultValuePipe(30), ParseIntPipe) days: number,
    @Body('movieId', ParseUUIDPipe) movieId: string,
    @Body('cinemaId', ParseUUIDPipe) cinemaId: string,
  ) {
    return this.movieProjectionsService.generateSingleMovieSingleCinema(days, movieId, cinemaId);
  }

  @Roles(AdminRole.SuperAdmin)
  @UseGuards(JwtAdminAuthGuard)
  @Post('/')
  async createMovieProjection(
    @Body() createMovieProjection: CreateMovieProjectionDto,
    @Req() req: ExpressRequestWithUser,
  ) {
    return this.movieProjectionsService.createByUser(createMovieProjection, req.user);
  }

  @Roles(AdminRole.SuperAdmin)
  @UseGuards(JwtAdminAuthGuard)
  @Put(':movieProjectionId')
  async editMovieProjection(
    @Param('movieProjectionId') movieProjectionId: string,
    @Body() editMovieProjection: EditMovieProjectionDto,
    @Req() req: ExpressRequestWithUser,
  ) {
    return this.movieProjectionsService.editByUser(movieProjectionId, editMovieProjection, req.user);
  }

  @Get(':movieProjectionId')
  async findSingleMovieProjection(@Param('movieProjectionId') movieProjectionId: string) {
    return this.movieProjectionsService.findById(movieProjectionId);
  }

  @Roles(AdminRole.SuperAdmin)
  @UseGuards(JwtAdminAuthGuard)
  @Post('generateDemoProjections')
  async generateDemoProjections() {
    return (await this.movieProjectionsService.generateDemoProjections()).flat(2);
  }

  @Roles(AdminRole.SuperAdmin)
  @UseGuards(JwtAdminAuthGuard)
  @Delete(':movieProjectionId')
  async deleteMovieProjection(@Param('movieProjectionId') movieProjectionId: string) {
    await this.movieProjectionsService.deleteMovieProjection(movieProjectionId);
  }

  @Roles(AdminRole.SuperAdmin)
  @UseGuards(JwtAdminAuthGuard)
  @Delete('cinema/:cinemaId/:movieProjectionId')
  async deleteMovieProjectionWithCinema(@Param('movieProjectionId') movieProjectionId: string) {
    await this.movieProjectionsService.deleteMovieProjection(movieProjectionId);
  }

  @Roles(AdminRole.SuperAdmin)
  @UseGuards(JwtAdminAuthGuard)
  @Delete('cinema/:cinemaId')
  async deleteBulkMovieProjectionsWithCinema(@Query('ids') ids: string[]) {
    await this.movieProjectionsService.deleteBulkMovieProjections(ids);

    return ids;
  }
}
