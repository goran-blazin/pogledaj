import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateReservationDto {
  @IsUUID(4)
  @IsNotEmpty()
  eventId: string;

  @IsArray()
  @IsUUID(4, { each: true })
  seatIds: string[];

  @IsEmail()
  @IsOptional()
  customerEmail?: string;

  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsString()
  customerPhone?: string;
}
