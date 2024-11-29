import { Inject, Injectable } from '@nestjs/common';
import { IMessageRepository } from 'src/core/domain/repositories';
import { MessageRepository } from 'src/core/usecases';
import { InteractionMessageUserDto, MessageCreateDto, MessageUpdateDto } from './dto/message.dto';
import { LoggerAdapter } from 'src/common/infraestructure/adapters/logger.adapter';
import { ErrorHandlerAdapter } from 'src/common/infraestructure/adapters/errorhandle.adapter';
import { ILoggerAdapter } from 'src/common/application/adapters/logger.adapter';
import { IErrorHandlerAdapter } from 'src/common/application/adapters/errorhandle.adapter';
import { MessageInteractionRepository } from 'src/core/usecases/messageinteraction.case';
import { IMessageInteractionRepository } from 'src/core/domain/repositories/messageinteraction.repository';

@Injectable()
export class MessageService {
    constructor(
        @Inject(MessageRepository)
        private readonly messageRepository: IMessageRepository,

        @Inject(MessageInteractionRepository)
        private readonly messageinteractionRepository: IMessageInteractionRepository,

        @Inject(LoggerAdapter)
        private readonly logger: ILoggerAdapter,

        @Inject(ErrorHandlerAdapter)
        private readonly errorHandling: IErrorHandlerAdapter
    ) { }

    async getAllMessages() {
        try {
            return await this.messageRepository.getAllMessages()
        } catch (error) {
            this.errorHandling.handleControllerError(this.logger, error);
        }
    }

    async getMessageById(id: string) {
        try {
            return await this.messageRepository.getMessageUnique({ id })
        } catch (error) {
            this.errorHandling.handleControllerError(this.logger, error);
        }
    }

    async createMessage(messageDto: MessageCreateDto) {
        try {
            return await this.messageRepository.createMessage(messageDto)
        } catch (error) {
            this.errorHandling.handleControllerError(this.logger, error);
        }
    }

    async updateMessage(id: string, messageDto: MessageUpdateDto) {
        try {
            return await this.messageRepository.updateMessage({
                id,
            }, messageDto)
        } catch (error) {
            this.errorHandling.handleControllerError(this.logger, error);
        }
    }

    async LikeUser(body: InteractionMessageUserDto) {
        try {
            return this.messageRepository.likeMessage(body)
        } catch (error) {
            this.errorHandling.handleControllerError(this.logger, error);
        }
    }

    async disLikeUser(body: InteractionMessageUserDto) {
        try {
            return this.messageRepository.disLikeMessage(body)
        } catch (error) {
            this.errorHandling.handleControllerError(this.logger, error);
        }
    }

    async getInteractions(message_id: string) {
        try {
            return this.messageinteractionRepository.findAll({ message_id })
        } catch (error) {
            this.errorHandling.handleControllerError(this.logger, error);
        }
    }
}
