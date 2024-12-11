import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ThreadRepository, ForumRepository, UserRepository, MessageRepository, UserRoleRepository } from 'src/core/usecases';
import { MessageInteractionRepository } from 'src/core/usecases/messageinteraction.case';
import { ChatRepository } from 'src/core/usecases/chat.case';

@Module({
  providers: [PrismaService, ThreadRepository, ForumRepository, UserRepository, MessageRepository, UserRoleRepository, MessageInteractionRepository, ChatRepository],
  exports: [PrismaService, ThreadRepository, ForumRepository, UserRepository, MessageRepository, UserRoleRepository, MessageInteractionRepository, ChatRepository],
})
export class DatabaseModule { }
