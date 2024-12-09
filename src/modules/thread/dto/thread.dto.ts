import { PartialType, PickType } from '@nestjs/swagger';
import { ThreadEntity } from 'src/core/domain/entities/Thread.entity';

export class ThreadCreateDto extends PickType(ThreadEntity, ['name', 'creation_date', 'private', 'access_price', 'image_url', 'forum_id', 'user_id']) { }
export class ThreadUpdateDto {
    name?: string
    private?: boolean
    access_price?: number | null
    image_url?: string
}
