import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AdapterModule } from 'src/common/infraestructure';
import { DatabaseModule } from 'src/common/infraestructure/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { S3Service } from 'src/shared/services/s3.service';

@Module({
  imports: [AuthModule, AdapterModule, DatabaseModule],
  providers: [UserService, S3Service],
  controllers: [UserController]
})
export class UserModule { }
