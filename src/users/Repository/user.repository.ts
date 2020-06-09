import { User } from '../entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userDto: UserDto) {
    return await this.save(userDto);
  }

  async findAllUser() {
    return this.find();
  }

  async findOneUser(id: number) {
    return this.findOneOrFail(id);
  }

  async updateUser(id: number, userDto: UserDto){
    return this.save({ ...userDto, id: Number(id) });
  }

  async removeUser(id: number){
    await this.findOneOrFail(id);
    return this.delete(id);
  }
}