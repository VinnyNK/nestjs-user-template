import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { IsUsernameOrEmailAlreadyExist } from './is-username-or-email-already-exist';

export class UserDto {
  @IsNumber()
  @IsOptional()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsUsernameOrEmailAlreadyExist)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @Validate(IsUsernameOrEmailAlreadyExist)
  readonly email: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  readonly active: boolean;
}
