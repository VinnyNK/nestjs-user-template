import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User|null> {
    const user: User = await this.usersService.findOneByUsername(username);
    if (user && await user.comparePassword(pass) && user.active) {
      return user;
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload = { username: user.username, sub: user.userId };
    const date = new Date()
    date.setDate(date.getDate() + 30)
    return {
      access_token: this.jwtService.sign(payload),
      expires_in: date
    };
  }
}
