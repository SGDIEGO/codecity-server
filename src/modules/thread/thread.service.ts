import { Inject, Injectable } from '@nestjs/common';
import { IThreadRespository } from 'src/core/domain/repositories/thread.repository';
import { MessageRepository, ThreadRepository } from 'src/core/usecases';
import { ThreadCreateDto, ThreadUpdateDto } from './dto/thread.dto';
import { IMessageRepository } from 'src/core/domain/repositories';

@Injectable()
export class ThreadService {
    constructor(
        @Inject(ThreadRepository)
        private readonly threadRepository: IThreadRespository,

        @Inject(MessageRepository)
        private readonly messageRepository: IMessageRepository
    ) { }

    async getAllThreads() {
        return await this.threadRepository.getAllThreads()
    }

    async getThreadById(id: string) {
        return await this.threadRepository.getThreadUnique({ id })
    }

    async createThread(threadDto: ThreadCreateDto) {
        return await this.threadRepository.createThread(threadDto)
    }

    async updateThread(id: string, threadDto: ThreadUpdateDto) {
        return await this.threadRepository.updateThread({ id }, threadDto)
    }

    async getThreadMessages(thread_id: string) {
        return await this.messageRepository.getAllMessages({ thread_id })
    }
}
