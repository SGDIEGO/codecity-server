import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/repositories/user.repository';
import { PrismaService } from 'src/common/infraestructure/database/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) { }
  async getAll(): Promise<Array<User>> {
    return await this.prisma.user.findMany()
  }
  async update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<User> {
    return await this.prisma.user.update({
      where,
      data
    })
  }

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
