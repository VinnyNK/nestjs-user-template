import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface } from '../interfaces/user.interface';
import { Exclude } from 'class-transformer';
import { UserRO } from './users.ro';
import * as bcrypt from 'bcrypt';

@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 70,
  })
  name: string;

  @Column({
    unique: true,
    length: 36,
  })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    unique: true,
    length: 50,
  })
  email: string;

  @Column({
    default: true,
  })
  active: boolean;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hashSync(this.password, 10);
    console.log(this.password);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(showToken = true): UserRO {
    const { id, name, username, email, active } = this;
    const responseObject: UserRO = {
      id,
      name,
      username,
      email,
      active,
    };

    return responseObject;
  }
}
