import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { UserService } from './services/user.service';
import { UserSocket } from './models/user.model';

@Injectable()
export class WsService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) { }

    async handleConnection(socket: Socket): Promise<UserSocket> {
        const token = socket.handshake.headers.authorization.split(' ')[1];
        const { user_id } = await this.jwtService.decode(token);
        const music_room_id = socket.handshake.query.music_room_id as string | undefined;
        if (!music_room_id) {
            throw new Error(`User must to be in any music room`)
        }

        const user = await this.userService.getUserById(user_id);
        return {
            id: user.id,
            fullName: user.name,
            url_profile: user.profile_url,
            socket,
            current_room: music_room_id,
        };
    }

    async handleDisconnect(socket: Socket): Promise<void> { }
}