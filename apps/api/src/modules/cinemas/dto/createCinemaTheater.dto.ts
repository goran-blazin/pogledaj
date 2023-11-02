import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CinemaExistsRule } from './cinemaExistsRule';

export class CreateCinemaTheaterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  supports3D: boolean;

  @IsNotEmpty()
  @Validate(CinemaExistsRule)
  cinemaId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  rowCount: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  columnCount: number;
}
