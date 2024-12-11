import { Module } from '@nestjs/common';
import { WSGateway } from './websocket.gateway';
import { ConfigModule } from '@nestjs/config';
import { SocketAdapter } from './adapters/socket.adapter';
import { PassportModule } from '@nestjs/passport';
import { WsService } from './websocket.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './services/user.service';
import { WsStrategy } from './strategies/ws.strategy';
import { DatabaseModule } from 'src/common/infraestructure/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { ChatService } from './services/chat.service';

@Module({
    imports: [
        ConfigModule,
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'ws' }),
    ],
    providers: [
        WsService,
        WSGateway,
        SocketAdapter,
        WsStrategy,
        JwtService,
        UserService,
        ChatService
    ],
})
export class WebSocketModule { }