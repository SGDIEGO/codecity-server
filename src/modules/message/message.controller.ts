import { Body, Controller, Get, Inject, Logger, Param, Post, Put, Request } from '@nestjs/common';
import { MessageService } from './message.service';
import { InteractionMessageUserDto, MessageCreateDto, MessageUpdateDto } from './dto/message.dto';
import { Auth } from '../auth/decorator/auth.decorator';
import { UserRole } from 'src/shared/enums/role.enums';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@Controller('messages')
export class MessageController {
    constructor(
        private readonly messageService: MessageService,
    ) { }
    @Get()
    async getAllMessages() {
        return await this.messageService.getAllMessages();
    }

    @Get(':id')
    async getMessageById(@Param('id') id: string) {
        return await this.messageService.getMessageById(id)
    }

    @ApiBearerAuth()
    @Auth(UserRole.Student)
    @Post()
    async createMessage(@Request() req, @Body() messageDto: MessageCreateDto) {
        return await this.messageService.createMessage(messageDto)
    }

    @Auth(UserRole.Staff)
    @Put(':id')
    async updateMessage(@Param('id') id: string, @Body() messageDto: MessageUpdateDto) {
        return await this.messageService.updateMessage(id, messageDto)
    }

    @Auth(UserRole.Student)
    @ApiBearerAuth()
    @Put(":id/like")
    async likeUser(@Body() likeMessageUserDto: InteractionMessageUserDto) {
        return await this.messageService.LikeUser(likeMessageUserDto);
    }

    @Auth(UserRole.Student)
    @ApiBearerAuth()
    @Put(":id/dislike")
    async disLikeUser(@Body() dislikeMessageUserDto: InteractionMessageUserDto) {
        return await this.messageService.disLikeUser(dislikeMessageUserDto);
    }

    @ApiBearerAuth()
    @Auth()
    @Get(':id/interactions')
    async getInteractions(@Param('id') id: string) {
        return await this.messageService.getInteractions(id);
    }
}
