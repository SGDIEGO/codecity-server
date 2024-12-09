import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ThreadRepository, ForumRepository, UserRepository, MessageRepository, UserRoleRepository } from 'src/core/usecases';
import { MessageInteractionRepository } from 'src/core/usecases/messageinteraction.case';

@Module({
  providers: [PrismaService, ThreadRepository, ForumRepository, UserRepository, MessageRepository, UserRoleRepository, MessageInteractionRepository],
  exports: [PrismaService, ThreadRepository, ForumRepository, UserRepository, MessageRepository, UserRoleRepository, MessageInteractionRepository],
})
export class DatabaseModule { }
