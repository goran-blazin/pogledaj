import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  ForbiddenException,
  Delete,
  Param,
  ParseUUIDPipe,
  Request,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/createReservation.dto';
import { JwtAdminAuthGuard } from '../../guards/jwtAdminAuth.guard';
import { ExpressRequestWithUser, FilterOptions } from '../../types/CommonTypes';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  @UseGuards(JwtAdminAuthGuard)
  findAll(
    @Query('sort') sort?: string,
    @Query('range') range?: string,
    @Query('filter') filter?: string,
  ) {
    return this.reservationsService.findAll({
      options: {
        sort: sort ? JSON.parse(sort) : undefined,
        range: range ? JSON.parse(range) : undefined,
        filter: filter ? JSON.parse(filter) : undefined,
      },
    });
  }

  @Get('seats/cinema/:cinemaId')
  @UseGuards(JwtAdminAuthGuard)
  findAllSeatsPerCinema(
    @Param('cinemaId', ParseUUIDPipe) cinemaId: string,
    @Query('sort') sort?: string,
    @Query('range') range?: string,
    @Query('filter') filter?: string,
  ) {
    return this.reservationsService.findAllSeats({
      options: {
        sort: sort ? JSON.parse(sort) : undefined,
        range: range ? JSON.parse(range) : undefined,
        filter: {
          ...(filter ? JSON.parse(filter) : {}),
          reservation: {
            movieProjection: {
              cinemaTheater: {
                cinemaId,
              },
            },
          },
        },
      },
    });
  }

  @Get('for-customer')
  findAllForCustomer(@Query('filter') filter: string) {
    const filterParsed = JSON.parse(filter) as FilterOptions;
    if (
      filterParsed?.ids &&
      Array.isArray(filterParsed.ids) &&
      filterParsed.ids.length
    ) {
      return this.reservationsService.findAll({
        options: { filter: filterParsed },
      });
    }

    throw new ForbiddenException('Please provide reservation ids in filter');
  }

  @Post(':reservationId/validate')
  @UseGuards(JwtAdminAuthGuard)
  validateReservation(
    @Request() req: ExpressRequestWithUser,
    @Param('reservationId', ParseUUIDPipe) reservationId: string,
  ) {
    return this.reservationsService.validateReservation(
      reservationId,
      req.user,
    );
  }

  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.reservationsService.findOne(id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReservationDto: ReservationUpdateInput) {
  //   return this.reservationsService.update(id, updateReservationDto);
  // }
  //
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
