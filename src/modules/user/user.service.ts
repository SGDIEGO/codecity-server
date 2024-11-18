import { Inject, Injectable } from '@nestjs/common';
import { UserCreateDto, UserUpdateDto } from './dto';
import { IUserRepository } from 'src/core/domain/repositories';
import { UserRepository } from 'src/core/usecases';
import { ILoggerAdapter } from 'src/common/application/adapters/logger.adapter';
import { LoggerAdapter } from 'src/common/infraestructure/adapters/logger.adapter';
import { IErrorHandlerAdapter } from 'src/common/application';
import { ErrorHandlerAdapter } from 'src/common/infraestructure/adapters/errorhandle.adapter';
import { UserRoleRepository } from 'src/core/usecases/userrole.case';
import { IUserRoleRepository } from 'src/core/domain/repositories/userroles.repository';

@Injectable()
export class UserService {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: IUserRepository,

        @Inject(UserRoleRepository)
        private readonly userRoleRepository: IUserRoleRepository,

        @Inject(LoggerAdapter)
        private readonly loggerAdapter: ILoggerAdapter,

        @Inject(ErrorHandlerAdapter)
        private readonly errorHandlerAdapter: IErrorHandlerAdapter
    ) { }

    async getUsers() {
        try {
            return await this.userRepository.getAll()
        } catch (error) {
            this.errorHandlerAdapter.handleControllerError(this.loggerAdapter, error)
        }
    }
    async getUserById(id: string) {
        try {
            return await this.userRepository.find({ id })
        } catch (error) {
            this.errorHandlerAdapter.handleControllerError(this.loggerAdapter, error)
        }
    }
    async createUser(body: UserCreateDto) {
        try {
            return await this.userRepository.create(body)
        } catch (error) {
            this.errorHandlerAdapter.handleControllerError(this.loggerAdapter, error)
        }
    }
    async updateUser(id: string, body: UserUpdateDto) {
        try {
            return await this.userRepository.update({ id }, body)
        } catch (error) {
            this.errorHandlerAdapter.handleControllerError(this.loggerAdapter, error)
        }
    }
    async generateRoles() {
        try {
            await this.userRoleRepository.generateRoles()
        } catch (error) {
            this.errorHandlerAdapter.handleControllerError(this.loggerAdapter, error)
        }
    }
}
