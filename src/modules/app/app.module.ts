import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ForumModule } from 'src/modules/forum/forum.module';
import { ThreadModule } from '../thread/thread.module';
import { MessageModule } from '../message/message.module';
import { UserModule } from '../user/user.module';
import { WebSocketModule } from '../websockets/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ForumModule,
    ThreadModule,
    MessageModule,
    UserModule,
    WebSocketModule
  ]
})
export class AppModule { }
