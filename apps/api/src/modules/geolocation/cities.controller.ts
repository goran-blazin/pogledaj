import {Controller, Get} from '@nestjs/common';
import {GeolocationService} from './geolocation.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly geolocationService: GeolocationService) {}

  @Get()
  getCities() {
    return this.geolocationService.findAllCities();
  }
}
