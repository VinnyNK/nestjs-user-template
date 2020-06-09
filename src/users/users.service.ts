import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './Repository/user.repository';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserRepository) private usersRepository: UserRepository) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.findAllUser();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneUser(id);
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { username: username } });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.removeUser(id);
  }

  async create(userDto: UserDto): Promise<void> {
    await this.usersRepository.createUser(this.usersRepository.create(userDto));
  }
}
