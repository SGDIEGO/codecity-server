import { PartialType, PickType } from '@nestjs/swagger';
import { ForumEntity } from 'src/core/domain/entities/Forum.entity';

export class ForumFindDto extends PartialType(ForumEntity) { }
export class ForumCreateDto {
    name: string
    creation_date: Date
    creator_id: string;
    image_url?: string
}
export class ForumUpdateDto {
    name: string
    image_url?: string
}
