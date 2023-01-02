import { Module } from '@nestjs/common';
import { MovieProjectionsService } from './movieProjections.service';
import { MovieProjectionsController } from './movieProjections.controller';

@Module({
  imports: [],
  controllers: [MovieProjectionsController],
  providers: [MovieProjectionsService],
  exports: [],
})
export class MovieProjectionsModule {}
