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
    private songs: Array<SongRequestSocket> = [];

    constructor(
        private readonly socketAdapter: SocketAdapter,
        private readonly websocketService: WsService,
    ) { }

    @WebSocketServer()
    server: Server;

    async handleConnection(socket: Socket) {
        const user = await this.websocketService.handleConnection(socket);
        this.users.push(user);
        this.logger.log('Client connected', user.id);
    }

    async handleDisconnect(socket: Socket) {
        this.users = this.users.filter((c) => c.socket.id != socket.id);
        this.logger.log('Client disconnected', socket.id);
    }

    @SubscribeMessage(SocketEvents.GETUSERSBYROOM)
    async getUsersByRoom(socket: Socket) {
        const userFind = this.users.find(
            (user) => user.socket.id == socket.id,
        );
        if (!userFind.current_room) {
            const error = `User is not in any room`
            this.handleError(socket, error)
        }

        const users_in_room = this.users.filter(
            (u) => u.current_room == userFind.current_room,
        );

        const users_names = users_in_room.map(user => {
            return {
                name: user.fullName,
                url_profile: user.url_profile,
            }
        })
        socket.emit(SocketEvents.GETUSERSBYROOM, users_names);
    }

    @SubscribeMessage(SocketEvents.SENDMESSAGEROOM)
    async sendMessageRoom(socket: Socket, message: any) {
        const { fullName, current_room } = this.users.find(
            (user) => user.socket.id == socket.id,
        );
        if (!current_room) {
            const error = `User ${fullName} is not in any room`
            this.handleError(socket, error)
        }

        this.socketAdapter.emitRoom(
            this.users,
            current_room,
            SocketEvents.SENDMESSAGEROOM,
            message,
        );
    }

    @SubscribeMessage(SocketEvents.VOTESONGREQUEST)
    async voteSongRequest(socket: Socket, song_request_id: string) {
        const { fullName, current_room } = this.users.find(
            (user) => user.socket.id == socket.id,
        );

        if (!current_room) {
            const error = `User ${fullName} is not in any room`
            this.handleError(socket, error)
        }

        this.songs = this.songs.map((s) =>
            s.id == song_request_id ? { ...s, votes: s.votes + 1 } : s,
        );

        this.socketAdapter.emitRoom(
            this.users,
            current_room,
            SocketEvents.VOTESONGREQUEST,
            song_request_id,
        );
    }

    async handleError(socket: Socket, error: string) {
        socket.emit(SocketEvents.ERRORS, error)
        throw new Error(error);
    }
}