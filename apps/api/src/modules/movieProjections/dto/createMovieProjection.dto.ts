import {
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinDate,
  Validate,
} from 'class-validator';
import {DateTime} from 'ts-luxon';
import {CurrencyCode} from '@prisma/client';
import {CinemaTheaterExistsRule} from '../../cinemas/dto/cinemaTheaterExistsRule';
import {MovieExistsRule} from '../../movies/dto/movieExistsRule';
import {Transform, Type} from 'class-transformer';

export class CreateMovieProjectionDto {
  @IsNotEmpty()
  @IsUUID()
  @Validate(MovieExistsRule)
  movieId: string;

  @IsNotEmpty()
  @IsUUID()
  @Validate(CinemaTheaterExistsRule)
  cinemaTheaterId: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @MinDate(DateTime.now().plus({days: 1}).startOf('day').toJSDate())
  projectionDateTime: Date;

  @IsString()
  @IsOptional()
  dubbedLanguageId?: string | null;

  @IsNotEmpty()
  @Transform(({value}) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  is3D: boolean;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  price: number;

  @IsNotEmpty()
  @IsIn(Object.keys(CurrencyCode))
  currencyCode: CurrencyCode;
}
