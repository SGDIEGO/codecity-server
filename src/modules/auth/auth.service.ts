import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserSigninDto, UserSignupDto } from './dto/user.dto';
import { jwtPayload } from 'src/shared/payload/auth.payload';
import { hash, randomUUID } from 'crypto';
import { IUserRepository } from 'src/core/domain/repositories/user.repository';
import { EncryptService } from 'src/shared/utils/encryption.service';
import { UserRole } from 'src/shared/enums/role.enums';
import { UserRepository } from 'src/core/usecases/user.case';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly encryptService: EncryptService,
  ) { }

  async signIn(user: UserSigninDto) {
    const userInfo = await this.userRepository.find({ email: user.email });
    if (!userInfo) throw new NotFoundException('Sign in information not registered');

    const passwordValidate = await this.encryptService.comparePasswords(user.password, userInfo.password)
    if (!passwordValidate) throw new BadRequestException('Incorrect password');

    const token = await this.signToken({ id: userInfo.id });
    return token;
  }

  async signUp(user: UserSignupDto) {
    if (user.password !== user.confirmPassword)
      throw new Error('Password does not match');

    const hashedPassword = await this.encryptService.hashPassword(user.password);
    const userInfo = await this.userRepository.create({
      id: randomUUID(),
      name: user.name,
      email: user.email,
      password: hashedPassword,
      user_role: {
        connect: {
          id: UserRole.Student,
        }
      }
    });

    const token = await this.signToken({ id: userInfo.id });
    return token;
  }

  async signToken(payload: jwtPayload) {
    return await this.jwtService.signAsync(payload);
  }
}
