import { IsString, IsNotEmpty, IsInt, Min, Max, IsDate } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  originalName: string;

  @IsString()
  @IsNotEmpty()
  localizedName: string;

  @IsString()
  @IsNotEmpty()
  plot: string;

  @IsString()
  @IsNotEmpty()
  localizedPlot: string;

  @IsString()
  @IsNotEmpty()
  genreIds: string[];

  @IsNotEmpty()
  @IsInt()
  runtimeMinutes: number;

  @IsNotEmpty()
  @IsString()
  originalLanguageId: string;

  @IsNotEmpty()
  @IsString()
  countryOfOriginId: string;

  @IsNotEmpty()
  @IsString({ each: true })
  posterImages: string[];

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  rating: number;

  @IsNotEmpty()
  @IsDate()
  releaseDate: Date | string;
}
