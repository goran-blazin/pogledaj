import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinDate,
} from 'class-validator';
import { DateTime } from 'ts-luxon';

export class CreateMovieProjectionDto {
  @IsNotEmpty()
  @IsUUID()
  movieId: string;

  @IsNotEmpty()
  @IsUUID()
  cinemaTheaterId: string;

  @IsNotEmpty()
  @IsDateString()
  @MinDate(DateTime.now().plus({ days: 1 }).startOf('day').toJSDate())
  projectionDateTime: Date;

  @IsString()
  @IsOptional()
  dubbedLanguageId?: string | null;

  @IsNotEmpty()
  @IsBoolean()
  is3D: boolean;
}
