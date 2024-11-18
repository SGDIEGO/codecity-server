import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AdapterModule } from 'src/common/infraestructure';
import { DatabaseModule } from 'src/common/infraestructure/database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, AdapterModule, DatabaseModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
