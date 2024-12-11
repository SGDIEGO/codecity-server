import { Inject, Injectable } from '@nestjs/common';
import { SaveMessageDto } from 'src/core/domain/dto/chat.dto';
import { IChatRepository } from 'src/core/domain/repositories/chat.repository';
import { ChatRepository } from 'src/core/usecases/chat.case';

@Injectable()
export class ChatService {
    constructor(
        @Inject(ChatRepository)
        private readonly chatRepository: IChatRepository,
    ) {}

    async saveMessage(data: SaveMessageDto){
        await this.chatRepository.saveMessage(data)
    }

    async getMessages(from: string, to: string){
        return this.chatRepository.getMessages(from, to)
    }
}