import { Module } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { CinemasController } from './cinemas.controller';
import { CinemaTheatersController } from './cinemaTheaters.controller';
import { CinemaTheatersService } from './cinemaTheaters.service';
import { CinemaExistsRule } from './dto/cinemaExistsRule';

@Module({
  controllers: [CinemasController, CinemaTheatersController],
  providers: [CinemasService, CinemaTheatersService, CinemaExistsRule],
})
export class CinemasModule {}
