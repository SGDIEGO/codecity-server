import { Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/core/usecases/user.case';
import { PrismaService } from 'src/infraestructure/database/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { EncryptService } from 'src/shared/utils/encryption.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserRepository, Logger, EncryptService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
