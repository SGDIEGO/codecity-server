import {
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Auth } from '../auth/decorator/auth.decorator';
import { UserRole } from 'src/shared/enums/role.enums';
import { ForumService } from './forum.service';
import { ForumCreateDto, ForumUpdateDto } from './dto/forum.dto';

@Controller('forums')
export class ForumController {
  constructor(
    private readonly logger: Logger,
    private readonly forumService: ForumService,
  ) { }

  @Auth()
  @Get()
  async getAllForums() {
    try {
      return await this.forumService.getAllForums();
    } catch (error) {
      this.handleErrorFunc(error);
    }
  }

  @Auth(UserRole.Student)
  @Post()
  async createForum(@Body() body: ForumCreateDto) {
    try {
      return await this.forumService.createForum(body);
    } catch (error) {
      this.handleErrorFunc(error);
    }
  }

  @Auth()
  @Get(':id')
  async getForum(@Param('id') id: string) {
    try {
      return await this.forumService.getForum(id);
    } catch (error) {
      this.handleErrorFunc(error);
    }
  }

  @Auth()
  @Put(':id')
  async updateForum(@Param('id') id: string, @Body() newForum: ForumUpdateDto) {
    try {
      return await this.forumService.updateForum(id, newForum);
    } catch (error) {
      this.handleErrorFunc(error);
    }
  }

  @Auth(UserRole.Staff)
  @Delete(':id')
  async deleteForum(@Param('id') id: string) {
    try {
      return await this.forumService.deleteForum(id)
    } catch (error) {
      this.handleErrorFunc(error);
    }
  }

  private handleErrorFunc(error: Error) {
    this.logger.log(error);
    throw error;
  }
}
