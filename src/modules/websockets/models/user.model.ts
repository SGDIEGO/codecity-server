import { Socket } from 'socket.io';

export interface UserSocket {
    id: string;
    fullName: string;
    url_profile: string | null

    socket: Socket;
}