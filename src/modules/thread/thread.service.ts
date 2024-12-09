import { Inject, Injectable } from '@nestjs/common';
import { IThreadRespository } from 'src/core/domain/repositories/thread.repository';
import { MessageRepository, ThreadRepository } from 'src/core/usecases';
import { ThreadCreateDto, ThreadUpdateDto } from './dto/thread.dto';
import { IMessageRepository } from 'src/core/domain/repositories';
import { S3Service } from 'src/shared/services/s3.service';
import { PartialType } from '@nestjs/swagger';

@Injectable()
export class ThreadService {
    constructor(
        @Inject(ThreadRepository)
        private readonly threadRepository: IThreadRespository,

        @Inject(MessageRepository)
        private readonly messageRepository: IMessageRepository,

        private readonly s3Service: S3Service
    ) { }

    async getAllThreads() {
        return await this.threadRepository.getAllThreads()
    }

    async getThreadById(id: string) {
        return await this.threadRepository.getThreadUnique({ id })
    }

    async createThread(threadDto: ThreadCreateDto, file?: Express.Multer.File) {
        threadDto.private = Boolean(threadDto.private)
        if (file) {
            threadDto.image_url = await this.s3Service.uploadFile(file);
        }

        return await this.threadRepository.createThread(threadDto)
    }

    async updateThread(id: string, threadDto: ThreadUpdateDto, file?: Express.Multer.File) {
        const existingThread = await this.threadRepository.getThreadUnique({ id })
        if (file) {
            if (existingThread.image_url) {
                const fileKey = existingThread.image_url.split('/').pop();
                await this.s3Service.deleteFile(fileKey);
            }
            threadDto.image_url = await this.s3Service.uploadFile(file);
        }

        return await this.threadRepository.updateThread({ id }, threadDto)
    }

    async getThreadMessages(thread_id: string) {
        return await this.messageRepository.getAllMessages({ thread_id })
    }
}
