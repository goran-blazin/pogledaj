import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { GeolocationService } from './geolocation.service';

@Module({
  controllers: [CitiesController],
  providers: [GeolocationService],
})
export class GeolocationModule {}
