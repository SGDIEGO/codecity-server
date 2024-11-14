import { Forum, Prisma, PrismaClient, PrismaPromise } from '@prisma/client';

export interface IForumRepository {
  findAll(): Promise<Array<Forum>>;
  find(where: Prisma.ForumWhereUniqueInput): Promise<Forum>;
  create(forumDto: Prisma.ForumCreateInput): Promise<Forum>;
  update(
    where: Prisma.ForumWhereUniqueInput,
    forumDto: Prisma.ForumUpdateInput,
  ): Promise<Forum>;
  delete(
    where: Prisma.ForumWhereUniqueInput,
  ): Promise<Forum>
}
