import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../Repository/user.repository';

@ValidatorConstraint({ name: "usernameExist", async: false })
@Injectable()
export class IsUsernameOrEmailAlreadyExist implements ValidatorConstraintInterface {
  constructor(@InjectRepository(UserRepository) private usersRepository: UserRepository) {}

  async validate(text: string, args: ValidationArguments) {
    return !await this.usersRepository.findOne({ where: [{ username: text }, {email: text}] });
  }

  defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
    return args.property + " $value not available!";
  }

}