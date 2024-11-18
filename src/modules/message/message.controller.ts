import { Body, Controller, Get, Inject, Logger, Param, Post, Put } from '@nestjs/common';
import { MessageService } from './message.service';
import { ErrorHandlerAdapter } from 'src/common/infraestructure/adapters/errorhandle.adapter';
import { IErrorHandlerAdapter } from 'src/common/application';
import { MessageCreateDto } from './dto/message.dto';
import { Auth } from '../auth/decorator/auth.decorator';
import { ILoggerAdapter } from 'src/common/application/adapters/logger.adapter';
import { LoggerAdapter } from 'src/common/infraestructure/adapters/logger.adapter';

@Controller('messages')
export class MessageController {
    constructor(
        private readonly messageService: MessageService,
        
        @Inject(LoggerAdapter)
        private readonly logger: ILoggerAdapter,

        @Inject(ErrorHandlerAdapter)
        private readonly errorHandling: IErrorHandlerAdapter
    ) { }
    @Get()
    async getAllMessages() {
        try {
            return await this.messageService.getAllMessages();
        } catch (error) {
            this.errorHandling.handleControllerError(this.logger, error);
        }
    }

    @Get(':id')
    async getMessageById(@Param('id') id: string) {
        try {
            return await this.messageService.getMessageById(id)
        } catch (error) {
            this.errorHandling.handleControllerError(this.logger, error);
        }
    }

    @Auth()
    @Post()
    async createMessage(@Body() messageDto: MessageCreateDto) {
        try {
            return await this.messageService.createMessage(messageDto)
        } catch (error) {
            this.errorHandling.handleControllerError(this.logger, error);
        }
    }

    @Put(':id')
    async updateMessage(@Param('id') id: string, @Body() messageDto: MessageCreateDto) {
        try {
            return await this.messageService.updateMessage(id, messageDto)
        } catch (error) {
            this.errorHandling.handleControllerError(this.logger, error);
        }
    }

    
}
