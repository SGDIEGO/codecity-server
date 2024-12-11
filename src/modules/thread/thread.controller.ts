import { Body, Controller, FileTypeValidator, Get, HttpStatus, Inject, Logger, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadCreateDto, ThreadUpdateDto } from './dto/thread.dto';
import { Auth } from '../auth/decorator/auth.decorator';
import { UserRole } from 'src/shared/enums/role.enums';
import { IErrorHandlerAdapter } from 'src/common/application';
import { ErrorHandlerAdapter } from 'src/common/infraestructure/adapters/errorhandle.adapter';
import { ILoggerAdapter } from 'src/common/application/adapters/logger.adapter';
import { LoggerAdapter } from 'src/common/infraestructure/adapters/logger.adapter';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

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
    @UseInterceptors(
        FileInterceptor('file'),
    )
    async createThread(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
        try {
            return await this.threadService.createThread(body.threadDto, file)
        } catch (error) {
            this.handleErrorFunc(error)
        }
    }

    @ApiBearerAuth()
    @Auth(UserRole.Staff)
    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('file'),
    )
    async updateThread(@Param('id') id: string, @Body() threadDto: ThreadUpdateDto, @UploadedFile(
        new ParseFilePipe({
            validators: [
                new FileTypeValidator({ fileType: '.(png|jpeg|jpg|ico)' })
            ]
        })
    ) file?: Express.Multer.File) {
        try {
            threadDto.private = Boolean(threadDto.private)
            threadDto.access_price = Number(threadDto.access_price)
            return await this.threadService.updateThread(id, threadDto, file)
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
