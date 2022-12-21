import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  Min,
  Max,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  originalName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  localizedName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  plot: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  genreId: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  actors: string[];

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  directors: string[];

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  producers: string[];

  @IsNotEmpty()
  @ApiProperty()
  @IsInt()
  runtimeMinutes: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  originalLanguageId: string;

  @ApiProperty({ required: false, default: null })
  @IsString()
  @IsOptional()
  dubbedLanguageId?: string | null;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  countryOfOriginId: string;

  @ApiProperty({ required: false, default: null })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  posterImages?: string[];

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  releaseDate: Date | string;
}
