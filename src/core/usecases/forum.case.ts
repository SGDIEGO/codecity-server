import { Forum, Prisma } from '@prisma/client';
import { IForumRepository } from '../domain/repositories/forum.repository';
import { PrismaService } from 'src/common/infraestructure/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { ForumCreateDto, ForumFindDto } from 'src/modules/forum/dto/forum.dto';
import { randomUUID } from 'crypto';

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
  async findAll(skip: number, take: number): Promise<Array<Forum>> {
    return await this.prisma.forum.findMany({
      skip,
      take
    });
  }

  async create(forumDto: ForumCreateDto): Promise<Forum> {
    return await this.prisma.forum.create({
      data: {
        ...forumDto,
        id: randomUUID()
      }
    });
  }

  async find(where: ForumFindDto): Promise<Forum> {
    return await this.prisma.forum.findFirst({
      where,
    });
  }
}
