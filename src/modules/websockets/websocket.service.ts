import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { UserService } from './services/user.service';
import { UserSocket } from './models/user.model';
import { SaveMessageDto } from 'src/core/domain/dto/chat.dto';
import { ChatService } from './services/chat.service';

@Injectable()
export class WsService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly chatService: ChatService
    ) { }

    async handleConnection(socket: Socket): Promise<UserSocket> {
        const token = socket.handshake.headers.authorization.split(' ')[1];

        if (!token) {
            throw new Error('Unauthorized');
        }

        const tokendecode = await this.jwtService.decode(token);
        return {
            id: tokendecode.id,
            fullName: tokendecode.name,
            url_profile: tokendecode.profile_url,
            socket,
        };
    }

    async handleDisconnect(socket: Socket): Promise<void> { }

    async saveMessage(data: SaveMessageDto) {
        try {
            this.chatService.saveMessage(data)
        } catch (error) {
            throw error;
        }
    }

    async getMessages(from: string, to: string) {
        try {
            return this.chatService.getMessages(from, to);
        } catch (error) {
            throw error;
        }
    }
}