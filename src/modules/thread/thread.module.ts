import { Module } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadController } from './thread.controller';
import { DatabaseModule } from 'src/common/infraestructure/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { AdapterModule } from 'src/common/infraestructure';
import { JwtStrategy } from 'src/shared/stragegy/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    AdapterModule
  ],
  providers: [ThreadService, JwtStrategy],
  controllers: [ThreadController]
})
export class ThreadModule {}
