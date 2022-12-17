// Core
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as Argon from 'argon2';
import { User, Session } from '@prisma/client';

// Errors
import { MESSAGES } from '../errors/messages';

// Prisma
import { PrismaService } from '../../frameworks/services/database/prisma.service';

// Tools
import { SignupDto } from '../dtos';

/**
 * Custom User class encapsulating User related logic
 */
export class UserClass {
  /**
   * User constructor
   *
   * @remarks
   * Checks if an User exists and returns a
   * not found error if it doesn't
   *
   * @param User - The User instance
   */
  constructor(private User: User) {
    if (!User) {
      throw new NotFoundException(MESSAGES.ACCOUNT_NOT);
    }
  }

  /**
   * Checks and throws an error if the password is incorrect.
   *
   * @param password - The provided password.
   * @param prisma - The prisma database service
   *
   * @returns Promise<this>
   */
  public async checkPassword(password: string): Promise<this> {
    if (!(await Argon.verify(this.User.password, password))) {
      throw new UnauthorizedException(MESSAGES.PASSWORD_WRONG);
    }

    return this;
  }

  /**
   * Creates a new User in the database
   *
   * @param prisma - The prisma database service
   * @param dto - Signup dto passed in
   * @param confirmToken - Token for confirm email
   * @param confirmTokenValidUntil - Token lifetime
   */
  static async createUser(
    prisma: PrismaService,
    dto: SignupDto,
  ): Promise<User> {
    const password = await Argon.hash(dto.password);
    return prisma.user.create({
      data: {
        firs_name: dto.first_name,
        last_name: dto.last_name,
        email: dto.email,
        username: dto.username,
        password,
      },
    });
  }

  /**
   * Checks if the username is already taken
   *
   * @param prisma - The prisma database service
   * @param username - Username provided
   */
  static async checkUsername(
    prisma: PrismaService,
    username: string,
  ): Promise<NotFoundException | void> {
    const User = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (User) {
      throw new ConflictException(MESSAGES.USERNAME_TAKEN);
    }
  }

  /**
   * Checks if the email is already taken
   *
   * @param prisma - The prisma database service
   * @param email - Email provided
   */
  static async checkEmail(
    prisma: PrismaService,
    email: string,
  ): Promise<NotFoundException | void> {
    const User = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (User) {
      throw new ConflictException(MESSAGES.EMAIL_TAKEN);
    }
  }

  /**
   * Updates the refresh token hash
   *
   * @param prisma - The prisma database service
   * @param id - The session id
   * @param token - The refreshToken to be hashed
   */
  static async updateToken(
    prisma: PrismaService,
    id: string,
    token: string,
  ): Promise<void> {
    const token_hash = await Argon.hash(token);
    await prisma.session.update({
      where: {
        id,
      },
      data: {
        token_hash,
      },
    });
  }

  /**
   * Creates a new session for User
   *
   * @param prisma - The prisma database service
   * @param id - The sessionId
   * @param UserId - The UserId
   * @param token - The refreshToken to be hashed
   * @param ip - The ip address of the client
   * @param device - The user-agent of the client
   */
  static async createSession(
    prisma: PrismaService,
    id: string,
    user_id: string,
    token: string,
    ip: string,
    device: string,
  ): Promise<Session> {
    const token_hash = await Argon.hash(token);
    return prisma.session.create({
      data: {
        id,
        ip,
        device,
        token_hash,
        user_id,
      },
    });
  }

  /**
   * Deletes the User session by id
   *
   * @param prisma - The prisma database service
   * @param id - The session id
   */
  static async deleteSession(prisma: PrismaService, id: string): Promise<void> {
    await prisma.session.delete({
      where: {
        id,
      },
    });
  }
}
