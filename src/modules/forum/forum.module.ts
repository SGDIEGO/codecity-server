import { Module, Logger } from '@nestjs/common';
import { ForumController } from './forum.controller';
import { JwtStrategy } from 'src/shared/stragegy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from 'src/core/usecases/user.case';
import { DatabaseModule } from 'src/infraestructure/database/database.module';
import { ForumService } from './forum.service';
import { ForumRepository } from 'src/core/usecases/forum.case';
import { DmsModule } from '../dms/dms.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    DmsModule
  ],
  providers: [
    Logger,
    UserRepository,
    ForumRepository,
    JwtStrategy,
    ForumService,
  ],
  controllers: [ForumController],
})
export class ForumModule { }
