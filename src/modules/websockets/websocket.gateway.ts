import { Injectable, Logger, UseGuards } from '@nestjs/common';
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    SubscribeMessage,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketAdapter } from './adapters/socket.adapter';
import { WsService } from './websocket.service';
import { UserSocket } from './models/user.model';
import { SocketEvents } from './interfaces/socket-events';
import { SongRequestSocket } from './models/song-request.model';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class WSGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger('AppGateWay');
    private users: Array<UserSocket> = [];

    constructor(
        private readonly websocketService: WsService,
    ) { }

    @WebSocketServer()
    server: Server;

    async handleConnection(socket: Socket) {
        try {
            const user = await this.websocketService.handleConnection(socket);
            this.users.push(user);
            this.logger.log('Client connected', user.id);
        } catch (error) {
            this.handleError(socket, error)
        }
    }

    async handleDisconnect(socket: Socket) {
        try {
            this.users = this.users.filter((c) => c.socket.id != socket.id);
            this.logger.log('Client disconnected', socket.id);
        } catch (error) {
            this.handleError(socket, error)
        }
    }

    @SubscribeMessage(SocketEvents.SENDMESSAGETOUSER)
    async sendMessageToUser(socket: Socket, data: IMessage) {
        try {
            const userFrom = this.users.find(
                (u) => u.socket.id == socket.id,
            );

            const userTo = this.users.find(
                (u) => u.id == data.to,
            )

            if (!userFrom || !userTo) {
                throw new Error('User not found');
            }

            await this.websocketService.saveMessage({
                from: userFrom.id,
                to: userTo.id,
                message: data.message,
            });

            // Send message to all users
            this.users.forEach((u) => {
                if (u.socket.id != socket.id)
                    u.socket.emit(SocketEvents.SENDMESSAGETOUSER, {
                        sender: userFrom.fullName,
                        content: data.message
                    });
            })

            /*             userTo.socket.emit(SocketEvents.SENDMESSAGETOUSER, {
                            sender: userFrom.fullName,
                            content: data.message
                        }); */
        } catch (error) {
            this.handleError(socket, error)
        }
    }

    @SubscribeMessage(SocketEvents.GETMESSAGES)
    async getMessages(socket: Socket, data: { to: string }) {
        try {
            const user = this.users.find(
                (u) => u.socket.id == socket.id,
            );

            if (!user) {
                throw new Error('User not found');
            }

            const messages = await this.websocketService.getMessages(user.id, data.to);

            socket.emit(SocketEvents.GETMESSAGES, messages);
        } catch (error) {
            this.handleError(socket, error)
        }
    }

    async handleError(socket: Socket, error: string) {
        socket.emit(SocketEvents.ERRORS, error)
        this.logger.error(error)
    }
}