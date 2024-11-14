import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/repositories/user.repository';
import { PrismaService } from 'src/infraestructure/database/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UserSigninDto, UserSignupDto } from 'src/modules/auth/dto/user.dto';
import { hash, randomUUID } from 'crypto';
import { UserRole } from 'src/shared/enums/role.enums';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) { }
  async find(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      return await this.prisma.user.findFirst({
        where
      });
    } catch (error) {
      throw error;
    }
  }

  async create(data: Prisma.UserCreateInput): Promise<User | null> {
    try {
      return await this.prisma.user.create({
        data
      });
    } catch (error) {
      throw error;
    }
  }
}
