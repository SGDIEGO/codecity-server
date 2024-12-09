import { Forum, Prisma } from '@prisma/client';
import { IForumRepository } from '../domain/repositories/forum.repository';
import { PrismaService } from 'src/common/infraestructure/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ForumFindDto, ForumCreateDto } from '../domain/dto/forum.dto';

@Injectable()
export class ForumRepository implements IForumRepository {
  constructor(private readonly prisma: PrismaService) { }
  async delete(where: Prisma.ForumWhereUniqueInput) {
    return await this.prisma.forum.delete({
      where
    })
  }

  async update(
    where: Prisma.ForumWhereUniqueInput,
    data: Prisma.ForumUpdateInput,
  ) {
    return await this.prisma.forum.update({
      where,
      data,
    });
  }

  async create(forumDto: ForumCreateDto) {
    return await this.prisma.forum.create({
      data: {
        ...forumDto,
        id: randomUUID()
      }
    });
  }

  async findAll(skip: number, take: number) {
    const forums = await this.prisma.forum.findMany({
      skip,
      take,
      select: {
        id: true,
        name: true,
        image_url: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            Thread: true,
          },
        },
        Thread: {
          orderBy: {
            creation_date: 'desc',
          },
          take: 1,
          select: {
            id: true,
            name: true,
            creation_date: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return forums.map(forum => ({
      id: forum.id,
      name: forum.name,
      image_url: forum.image_url,
      numberOfPosts: forum._count.Thread,
      creator: forum.creator,
      lastPost: forum.Thread[0] ? {
        id: forum.Thread[0].id,
        name: forum.Thread[0].name,
        creation_date: forum.Thread[0].creation_date,
        user: forum.Thread[0].user,
      } : null,
    }));
  }

  async find(where: Prisma.ForumWhereInput) {
    const forum = await this.prisma.forum.findFirst({
      where,
      select: {
        id: true,
        name: true,
        image_url: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            Thread: true,
          },
        },
        Thread: {
          orderBy: {
            creation_date: 'desc',
          },
          take: 1,
          select: {
            id: true,
            name: true,
            creation_date: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!forum) {
      return null;
    }

    return {
      id: forum.id,
      name: forum.name,
      numberOfPosts: forum._count.Thread,
      creator: forum.creator,
      image_url: forum.image_url,
      lastPost: forum.Thread[0] ? {
        id: forum.Thread[0].id,
        name: forum.Thread[0].name,
        creation_date: forum.Thread[0].creation_date,
        user: forum.Thread[0].user,
      } : null,
    };
  }
}
