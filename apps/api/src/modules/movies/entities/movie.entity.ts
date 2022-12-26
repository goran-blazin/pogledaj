import { Movie, Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class MovieEntity implements Movie {
  @ApiProperty()
  id: string;

  @ApiProperty()
  originalName: string;

  @ApiProperty()
  localizedName: string;

  @ApiProperty()
  plot: string;

  @ApiProperty()
  genreIds: string[];

  @ApiProperty()
  actors: Prisma.JsonValue;

  @ApiProperty()
  directors: Prisma.JsonValue;

  @ApiProperty()
  producers: Prisma.JsonValue;

  @ApiProperty()
  runtimeMinutes: number;

  @ApiProperty()
  originalLanguageId: string;

  @ApiProperty()
  dubbedLanguageId: string;

  @ApiProperty()
  countryOfOriginId: string;

  @ApiProperty()
  posterImages: Prisma.JsonValue;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  releaseDate: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
