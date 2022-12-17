// Cpre
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { PickType } from '@nestjs/swagger';

/**
 * DTO used in validating new account registrations
 */
export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(1, 50)
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

/**
 * DTO used in validating account logins
 */
export class LoginDto extends PickType(SignupDto, [
  'username' as const,
  'password' as const,
]) {}
