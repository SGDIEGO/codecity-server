import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ThreadRepository, ForumRepository, UserRepository, MessageRepository, UserRoleRepository } from 'src/core/usecases';

@Module({
  providers: [PrismaService, ThreadRepository, ForumRepository, UserRepository, MessageRepository, UserRoleRepository],
  exports: [PrismaService, ThreadRepository, ForumRepository, UserRepository, MessageRepository, UserRoleRepository],
})
export class DatabaseModule { }
