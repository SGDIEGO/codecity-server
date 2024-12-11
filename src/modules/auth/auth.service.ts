import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserSigninDto, UserSigninGoogleOauthDto, UserSignupDto } from './dto/auth.dto';
import { jwtPayload } from 'src/shared/payload/auth.payload';
import { IUserRepository } from 'src/core/domain/repositories/user.repository';
import { EncryptService } from 'src/shared/utils/encryption.service';
import { UserRole } from 'src/shared/enums/role.enums';
import { UserRepository } from 'src/core/usecases/user.case';
import { AuthResponseDto, AuthResponseDtoFunc } from './dto/token.dto';

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

    const token = await this.signToken({
      ...userInfo,
    });

    return AuthResponseDtoFunc(token, userInfo)
  }

  async signUp(user: UserSignupDto): Promise<AuthResponseDto> {
    if (user.password !== user.confirmPassword) throw new BadRequestException('Password does not match');

    const hashedPassword = await this.encryptService.hashPassword(user.password);
    const userInfo = await this.userRepository.create({
      id: await this.encryptService.generateRandomUUID(),
      password: hashedPassword,
      user_role: {
        connect: {
          name: UserRole.Student,
        }
      },
      name: user.name,
      email: user.email,
    });

    const token = await this.signToken({
      ...userInfo
    });

    return AuthResponseDtoFunc(token, userInfo)
  }

  async signInGoogle(user: UserSigninGoogleOauthDto): Promise<AuthResponseDto> {
    const userInfo = await this.userRepository.getUser({ email: user.email });

    if (userInfo) {
      const token = await this.signToken({
        ...userInfo
      });

      return AuthResponseDtoFunc(token, userInfo)
    }

    const password = await this.encryptService.generateRandomUUID()

    return await this.signUp({
      name: user.name,
      email: user.email,
      profile_url: user.profile_url,
      password,
      confirmPassword: password
    })
  }

  async signToken(payload: jwtPayload) {
    return await this.jwtService.signAsync(payload);
  }
}
