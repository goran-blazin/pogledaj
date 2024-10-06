import {
  ArrayMinSize,
  IsArray,
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
  ValidateNested,
} from 'class-validator';
import {MovieExistsRule} from '../../movies/dto/movieExistsRule';
import {CinemaTheaterExistsRule} from '../../cinemas/dto/cinemaTheaterExistsRule';
import {Transform, Type} from 'class-transformer';
import {CurrencyCode} from '@prisma/client';
import {DateTime} from 'ts-luxon';

class MovieProjectionDetails {
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @MinDate(DateTime.now().startOf('day').toJSDate())
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

export class CreateBulkMovieProjectionDto {
  @IsNotEmpty()
  @IsUUID()
  @Validate(MovieExistsRule)
  movieId: string;

  @IsNotEmpty()
  @IsUUID()
  @Validate(CinemaTheaterExistsRule)
  cinemaTheaterId: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({each: true})
  @Type(() => MovieProjectionDetails)
  projectionDetails: MovieProjectionDetails[];
}
