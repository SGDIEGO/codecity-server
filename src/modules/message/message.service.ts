import { Inject, Injectable } from '@nestjs/common';
import { IMessageRepository } from 'src/core/domain/repositories';
import { MessageRepository } from 'src/core/usecases';
import { MessageCreateDto, MessageUpdateDto } from './dto/message.dto';

@Injectable()
export class MessageService {
    constructor (
        @Inject(MessageRepository)
        private readonly messageRepository: IMessageRepository
    ) {}

    async getAllMessages() {
        return this.messageRepository.getAllMessages()
    }

    async getMessageById(id: string) {
        return this.messageRepository.getMessageUnique({ id })
    }

    async createMessage(messageDto: MessageCreateDto) {
        return this.messageRepository.createMessage(messageDto)
    }

    async updateMessage(id: string, messageDto: MessageUpdateDto) {
        return this.messageRepository.updateMessage({ id }, messageDto)
    }
}
