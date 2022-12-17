// Core
import { Exclude } from 'class-transformer';
import { User } from '@prisma/client';

/**
 * Account Entity used in transforming and sanitizing.
 */
export class UserEntity implements User {
  id: string;

  firs_name: string;

  last_name: string;
  email: string;

  username: string;
  createdAt: Date;

  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
