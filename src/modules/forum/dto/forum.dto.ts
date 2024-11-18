import { PartialType, PickType } from '@nestjs/swagger';
import { ForumEntity } from 'src/core/domain/entities/Forum.entity';

export class ForumFindDto extends PartialType(ForumEntity) { }
export class ForumCreateDto extends PickType(ForumEntity, ['name', 'creation_date', 'creator_id'] as const) { }
export class ForumUpdateDto extends PickType(ForumEntity, ['name', 'total_likes', 'total_messages', 'total_users', 'creator_id'] as const) { }
