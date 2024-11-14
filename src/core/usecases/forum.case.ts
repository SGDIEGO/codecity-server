import { Forum, Prisma } from '@prisma/client';
import { IForumRepository } from '../domain/repositories/forum.repository';
import { PrismaService } from 'src/infraestructure/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ForumRepository implements IForumRepository {
  constructor(private readonly prisma: PrismaService) { }
  async delete(where: Prisma.ForumWhereUniqueInput): Promise<Forum> {
    return await this.prisma.forum.delete({
      where
    })
  }
  async update(
    where: Prisma.ForumWhereUniqueInput,
    data: Prisma.ForumUpdateInput,
  ): Promise<Forum> {
    return await this.prisma.forum.update({
      where,
      data,
    });
  }
  async findAll(): Promise<Array<Forum>> {
    return await this.prisma.forum.findMany();
  }

  async create(forumDto: Prisma.ForumCreateInput): Promise<Forum> {
    return await this.prisma.forum.create({ data: forumDto });
  }

  async find(where: Prisma.ForumWhereUniqueInput): Promise<Forum> {
    return await this.prisma.forum.findFirst({
      where,
    });
  }
}
