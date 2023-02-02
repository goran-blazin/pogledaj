import { InputProvider } from '@prisma/client';
import { IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpsertFromExternalDto {
  @IsNotEmpty()
  @IsIn(Object.keys(InputProvider))
  externalType: InputProvider;

  @IsString()
  @IsNotEmpty()
  externalId: string;

  @IsString()
  @IsNotEmpty()
  localizedTitle: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  localizedPlot: string;
}
