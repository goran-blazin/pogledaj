import {PasswordValidation, PasswordValidationRequirement} from 'class-validator-password-check';
import {IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength, Validate} from 'class-validator';
import {AdminRole} from '@prisma/client';
import {Match} from '../../../decorators/customValidation/match.decorator';
import {AdminUserExistsRule} from './adminUserExistsRule';
import {ValidateCinemaExistence, ValidateCinemaForPassedRole} from './validateCinemaIdsRules';

const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};

export class CreateAdminUserDto {
  @IsEmail()
  @Validate(AdminUserExistsRule)
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Validate(PasswordValidation, [passwordRequirement])
  readonly password: string;

  @Match('password', {
    message: `repeatPassword must match the password`,
  })
  readonly repeatPassword: string;

  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @IsIn(Object.keys(AdminRole))
  readonly role: AdminRole;

  @IsOptional()
  @IsUUID(4, {each: true})
  @Validate(ValidateCinemaExistence)
  @Validate(ValidateCinemaForPassedRole)
  readonly cinemaIds: string[] = [];
}
