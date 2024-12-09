import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/core/domain/entities/User.entity';
import { IUserRepository } from 'src/core/domain/repositories';
import { UserRepository } from 'src/core/usecases';

@Injectable()
export class UserService {
    constructor(
        @Inject(UserRepository)
        private readonly userRoomRepository: IUserRepository,
    ) {}

    async getUserById(user_id: string): Promise<UserEntity> {
        return await this.userRoomRepository.getUser({ id: user_id });
    }
}