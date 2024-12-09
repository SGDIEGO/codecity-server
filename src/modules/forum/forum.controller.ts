import {
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Query,
  Inject,
} from '@nestjs/common';
import { Auth } from '../auth/decorator/auth.decorator';
import { UserRole } from 'src/shared/enums/role.enums';
import { ForumService } from './forum.service';
import { ForumCreateDto, ForumUpdateDto } from './dto/forum.dto';
import { IErrorHandlerAdapter } from 'src/common/application';
import { ErrorHandlerAdapter } from 'src/common/infraestructure/adapters/errorhandle.adapter';
import { ILoggerAdapter } from 'src/common/application/adapters/logger.adapter';
import { LoggerAdapter } from 'src/common/infraestructure/adapters/logger.adapter';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@Controller('forums')
export class ForumController {
  constructor(
    private readonly forumService: ForumService,

    @Inject(LoggerAdapter)
    private readonly logger: ILoggerAdapter,

    @Inject(ErrorHandlerAdapter)
    private readonly errorHandling: IErrorHandlerAdapter
  ) { }

  @Get()
  async getAllForums(@Query('page') page: number = 1) {
    try {
      return await this.forumService.getAllForums(page, 10);
    } catch (error) {
      this.errorHandling.handleControllerError(this.logger, error)
    }
  }

  @Get(':id')
  async getForum(@Param('id') id: string) {
    try {
      return await this.forumService.getForum(id);
    } catch (error) {
      this.errorHandling.handleControllerError(this.logger, error)
    }
  }

  @ApiBearerAuth()
  @Auth(UserRole.Staff)
  @Post()
  async createForum(@Body() body: ForumCreateDto) {
    try {
      return await this.forumService.createForum(body);
    } catch (error) {
      this.errorHandling.handleControllerError(this.logger, error)
    }
  }

  @ApiBearerAuth()
  @Auth(UserRole.Staff)
  @Patch(':id')
  async updateForum(@Param('id') id: string, @Body() newForum: ForumUpdateDto) {
    try {
      return await this.forumService.updateForum(id, newForum);
    } catch (error) {
      this.errorHandling.handleControllerError(this.logger, error)
    }
  }

  @ApiBearerAuth()
  @Auth(UserRole.Staff)
  @Delete(':id')
  async deleteForum(@Param('id') id: string) {
    try {
      return await this.forumService.deleteForum(id)
    } catch (error) {
      this.errorHandling.handleControllerError(this.logger, error)
    }
  }

  @Get(":id/threads")
  async getAllThreads(@Param(':id') id: string) {
    try {
      return this.forumService.getAllThreads(id)
    } catch (error) {
      this.errorHandling.handleControllerError(this.logger, error)
    }
  }

}
