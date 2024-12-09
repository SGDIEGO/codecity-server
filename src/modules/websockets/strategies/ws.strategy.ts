import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../../../core/domain/entities/User.entity';
import { WsPayloadInterface } from '../interfaces/ws-payload.interface';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUserRepository } from 'src/core/domain/repositories';
import { UserRepository } from 'src/core/usecases';

@Injectable()
export class WsStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: IUserRepository,
        configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.get('JWT_KEY'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: WsPayloadInterface): Promise<UserEntity> {
        const { user_id: id } = payload;

        const user = await this.userRepository.getUser({ id });

        if (!user) throw new UnauthorizedException('Token is not valid.');

        if (!user.isActive)
            throw new UnauthorizedException(
                'User is inactive, contact an admin.',
            );

        return user;
    }
}