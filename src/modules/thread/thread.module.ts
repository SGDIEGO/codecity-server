import { Module } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadController } from './thread.controller';
import { DatabaseModule } from 'src/common/infraestructure/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { AdapterModule } from 'src/common/infraestructure';
import { JwtStrategy } from 'src/shared/stragegy/jwt.strategy';
import { S3Service } from 'src/shared/services/s3.service';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    AdapterModule
  ],
  providers: [ThreadService, JwtStrategy, S3Service],
  controllers: [ThreadController]
})
export class ThreadModule {}
