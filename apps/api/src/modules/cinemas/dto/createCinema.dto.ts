import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCinemaDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsString()
  phone?: string;

  @IsNotEmpty()
  @IsString()
  cityId: string;
}
