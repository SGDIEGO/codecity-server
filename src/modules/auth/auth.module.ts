import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EncryptService } from 'src/shared/utils/encryption.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { DatabaseModule } from 'src/common/infraestructure/database/database.module';
import { AdapterModule } from 'src/common/infraestructure';

@Module({
  imports: [
    DatabaseModule,
    AdapterModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EncryptService, GoogleStrategy],
  exports: [AuthService /*JwtModule*/, PassportModule],
})
export class AuthModule { }
