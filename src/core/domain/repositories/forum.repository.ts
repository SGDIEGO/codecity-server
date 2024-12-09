import { Forum, Prisma, PrismaClient, PrismaPromise } from '@prisma/client';
import { ForumCreateDto, ForumFindDto } from 'src/modules/forum/dto/forum.dto';

export interface IForumRepository {
  findAll(skip: number, take: number): Promise<ForumFindDto[]>;
  find(where: ForumFindDto): Promise<ForumFindDto>;
  create(forumDto: ForumCreateDto): Promise<Forum>;
  update(
    where: Prisma.ForumWhereUniqueInput,
    forumDto: Prisma.ForumUpdateInput,
  ): Promise<Forum>;
  delete(
    where: Prisma.ForumWhereUniqueInput,
  ): Promise<Forum>
}
