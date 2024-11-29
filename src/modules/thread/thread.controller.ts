import { Body, Controller, Get, HttpStatus, Inject, Logger, Param, Post, Put } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadCreateDto, ThreadUpdateDto } from './dto/thread.dto';
import { Auth } from '../auth/decorator/auth.decorator';
import { UserRole } from 'src/shared/enums/role.enums';
import { IErrorHandlerAdapter } from 'src/common/application';
import { ErrorHandlerAdapter } from 'src/common/infraestructure/adapters/errorhandle.adapter';
import { ILoggerAdapter } from 'src/common/application/adapters/logger.adapter';
import { LoggerAdapter } from 'src/common/infraestructure/adapters/logger.adapter';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('threads')
export class ThreadController {
    constructor(
        private readonly threadService: ThreadService,

        @Inject(LoggerAdapter)
        private readonly logger: ILoggerAdapter,

        @Inject(ErrorHandlerAdapter)
        private readonly errorHandling: IErrorHandlerAdapter
    ) { }

    @Get()
    async getAllThreads() {
        try {
            return await this.threadService.getAllThreads();
        } catch (error) {
            throw new Error(error)
        }
    }

    @Get(':id')
    async getThreadById(@Param('id') id: string) {
        try {
            return await this.threadService.getThreadById(id);
        } catch (error) {
            throw new Error(error)
        }
    }

    @ApiBearerAuth()
    @Auth(UserRole.Middle)
    @Post()
    async createThread(@Body() threadDto: ThreadCreateDto) {
        try {
            return await this.threadService.createThread(threadDto)
        } catch (error) {
            this.handleErrorFunc(error)
        }
    }

    @ApiBearerAuth()
    @Auth(UserRole.Staff)
    @Put(':id')
    async updateThread(@Param('id') id: string, @Body() threadDto: ThreadUpdateDto) {
        try {
            return await this.threadService.updateThread(id, threadDto)
        } catch (error) {
            this.handleErrorFunc(error)
        }
    }

    @ApiBearerAuth()
    @Auth()
    @Get(':id/messages')
    async getThreadMessages(@Param('id') id: string) {
        try {
            return await this.threadService.getThreadMessages(id)
        } catch (error) {
            this.handleErrorFunc(error)
        }
    }

    private handleErrorFunc(error: any) {
        if (error.status == 500) {
            this.logger.log(error);
            throw {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error, please check server logs!',
            }
        } else {
            throw error;
        }
    }
}
