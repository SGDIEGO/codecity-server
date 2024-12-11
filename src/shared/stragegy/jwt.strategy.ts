import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from 'src/core/domain/repositories/user.repository';
import { UserRepository } from 'src/core/usecases/user.case';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: any): Promise<User> {
    const { id } = payload;
    const user = await this.userRepository.getUser({ id });

    if (!user) {
      throw new UnauthorizedException('Token not valid');
    }
    return user;
  }
}
