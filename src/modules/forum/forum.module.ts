import { Module } from '@nestjs/common';
import { ForumController } from './forum.controller';
import { JwtStrategy } from 'src/shared/stragegy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/common/infraestructure/database/database.module';
import { ForumService } from './forum.service';
import { DmsModule } from '../dms/dms.module';
import { AdapterModule } from 'src/common/infraestructure';
import { AuthModule } from '../auth/auth.module';
import { S3Service } from 'src/shared/services/s3.service';

@Module({
  imports: [
    DatabaseModule,
    AdapterModule,
    AuthModule,
    DmsModule
  ],
  providers: [
    JwtStrategy,
    ForumService,
    S3Service
  ],
  controllers: [ForumController],
})
export class ForumModule { }
