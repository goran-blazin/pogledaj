import {IsEmail, IsNotEmpty, IsOptional, IsString, MinLength} from 'class-validator';

export class SupportEmailDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  telephone?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(15)
  message: string;
}
