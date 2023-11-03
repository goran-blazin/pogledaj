import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCinemaDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  address: string;

  @IsString()
  phone?: string;

  @IsNotEmpty()
  @IsString()
  cityId: string;
}
