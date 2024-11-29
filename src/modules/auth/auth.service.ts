import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserSigninDto, UserSigninGoogleOauthDto, UserSignupDto } from './dto/auth.dto';
import { jwtPayload } from 'src/shared/payload/auth.payload';
import { IUserRepository } from 'src/core/domain/repositories/user.repository';
import { EncryptService } from 'src/shared/utils/encryption.service';
import { UserRole } from 'src/shared/enums/role.enums';
import { UserRepository } from 'src/core/usecases/user.case';
import { AuthResponseDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly encryptService: EncryptService,
  ) { }

  async signIn(user: UserSigninDto): Promise<AuthResponseDto> {
    const userInfo = await this.userRepository.find({ email: user.email });
    if (!userInfo) throw new NotFoundException('Sign in information not registered');

    const passwordValidate = await this.encryptService.comparePasswords(user.password as string, userInfo.password)
    if (!passwordValidate) throw new BadRequestException('Incorrect password');

    const token = await this.signToken({ id: userInfo.id });
    return {
      token,
      user_id: userInfo.id
    }
  }

  async signUp(user: UserSignupDto): Promise<AuthResponseDto> {
    const hashedPassword = await this.encryptService.hashPassword(user.password);
    const userInfo = await this.userRepository.create({
      id: await this.encryptService.generateRandomUUID(),
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
    return {
      token,
      user_id: userInfo.id
    };
  }

  async signInGoogle(user: UserSigninGoogleOauthDto) {
    const userInfo = await this.userRepository.find({ email: user.email });
    if (userInfo) {
      const token = await this.signToken({ id: userInfo.id });
      return {
        token,
        user_id: userInfo.id
      }
    }

    return await this.signUp({
      ...user,
      password: await this.encryptService.generateRandomUUID(),
    })
  }

  async signToken(payload: jwtPayload) {
    return await this.jwtService.signAsync(payload);
  }
}
