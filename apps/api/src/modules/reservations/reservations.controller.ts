import { Controller, Post, Body } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/createReservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  // @Get()
  // findAll() {
  //   return this.reservationsService.findAll();
  // }
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
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reservationsService.remove(id);
  // }
}
