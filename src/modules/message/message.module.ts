import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { AdapterModule } from 'src/common/infraestructure';
import { DatabaseModule } from 'src/common/infraestructure/database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AdapterModule, AuthModule],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule { }
