import {MovieLengthCategory} from '../../../types/MovieTypes';
import {IsArray, IsIn, IsOptional, IsString} from 'class-validator';

export class MovieFilterSearchDto {
  @IsOptional()
  @IsArray()
  @IsIn(Object.keys(MovieLengthCategory), {each: true})
  movieLengths: MovieLengthCategory[];

  @IsOptional()
  @IsArray()
  @IsString({each: true})
  selectedActorPersonIds: string[];

  @IsOptional()
  @IsArray()
  @IsString({each: true})
  selectedCinemasIds: string[];

  @IsOptional()
  @IsString()
  selectedCityId: string;

  @IsOptional()
  @IsArray()
  @IsString({each: true})
  selectedCountries: string[];

  @IsOptional()
  @IsString()
  selectedDateFrom: string;

  @IsOptional()
  @IsString()
  selectedDateTo: string;

  @IsOptional()
  @IsString()
  selectedDirectorPersonId: string;

  @IsOptional()
  @IsArray()
  @IsString({each: true})
  selectedGenres: string[];
}
