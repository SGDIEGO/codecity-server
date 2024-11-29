import { PartialType, PickType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ThreadEntity } from 'src/core/domain/entities/Thread.entity';

export class ThreadCreateDto extends PickType(ThreadEntity, ['name', 'creation_date', 'private', 'access_price', 'image_url', 'forum_id', 'user_id']) { }
export class ThreadUpdateDto extends PartialType(ThreadEntity) { }
