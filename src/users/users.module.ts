import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { IsUsernameOrEmailAlreadyExist } from './dto/is-username-or-email-already-exist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserRepository } from './Repository/user.repository';
import { AuthService } from '../auth/auth.service';

@Module({
  providers: [UsersService, IsUsernameOrEmailAlreadyExist],
  controllers: [UsersController],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
})
export class UsersModule {}
