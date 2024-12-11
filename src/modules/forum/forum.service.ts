import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { IForumRepository } from 'src/core/domain/repositories/forum.repository';
import { ForumCreateDto, ForumUpdateDto } from './dto/forum.dto';
import { ForumRepository } from 'src/core/usecases/forum.case';
import { IThreadRespository } from 'src/core/domain/repositories/thread.repository';
import { ThreadRepository } from 'src/core/usecases/thread.case';
import { S3Service } from 'src/shared/services/s3.service';

export class ForumService {
  constructor(
    @Inject(ForumRepository)
    private readonly forumRepository: IForumRepository,

    @Inject(ThreadRepository)
    private readonly threadRepository: IThreadRespository,

    private readonly s3Service: S3Service
  ) { }

  async getAllForums(page: number, limit: number) {
    return await this.forumRepository.findAll((page - 1) * limit, limit);
  }

  async getForum(id: string) {
    const forum = await this.forumRepository.find({ id });
    if (!forum) throw new BadRequestException('Forum not found');

    return forum;
  }

  async createForum(body: ForumCreateDto, file?: Express.Multer.File) {
    if (file) {
        body.image_url = await this.s3Service.uploadFile(file);
    }

    return await this.forumRepository.create(body);
  }

  async updateForum(id: string, body: ForumUpdateDto, file?: Express.Multer.File) {
    const existingForum = await this.forumRepository.find({ id })
    if (!existingForum) throw new NotFoundException('Forum not found');

    if (file) {
        if (existingForum.image_url) {
            const fileKey = existingForum.image_url.split('/').pop();
            await this.s3Service.deleteFile(fileKey);
        }
        body.image_url = await this.s3Service.uploadFile(file);
    }

    return await this.forumRepository.update({ id }, body)
  }

  async deleteForum(id: string) {
    const forum = await this.forumRepository.delete({ id });
    if (!forum) throw new NotFoundException('Error deleting forum')

    return forum;
  }

  async getAllThreads(forum_id: string) {
    const threads = await this.threadRepository.getAllThreads({ forum_id })
    return threads;
  }
}
