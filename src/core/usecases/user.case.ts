import { BadRequestException, Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/repositories/user.repository';
import { PrismaService } from 'src/common/infraestructure/database/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UserSelectDto } from 'src/modules/user/dto';
import { UserRole } from 'src/shared/enums/role.enums';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) { }
  async getAll(): Promise<Array<User>> {
    return await this.prisma.user.findMany()
  }

  async getUser(where: Prisma.UserWhereUniqueInput): Promise<UserSelectDto> {
    return await this.prisma.user.findUnique({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        profile_url: true,
        user_role: true,
        interactions: true,
        join_date: true,
      },
    });
  }

  async update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<User> {
    return await this.prisma.user.update({
      where,
      data
    })
  }

  async find(where: Prisma.UserWhereUniqueInput, select: Prisma.UserSelect): Promise<User> {
    try {
      return await this.prisma.user.findFirst({
        select,
        where
      });
    } catch (error) {
      throw error;
    }
  }
  async create(data: Prisma.UserCreateInput) {
    try {
      return await this.prisma.user.create({
        data: {
          ...data,
          user_role: {
            connect: {
              name: UserRole.Student
            }
          }
        }
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new BadRequestException("Data already exists in database.")
        }
      }

      throw error;
    }
  }
}
