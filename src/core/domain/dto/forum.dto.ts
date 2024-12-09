import { PickType } from "@nestjs/swagger";
import { ForumEntity } from "../entities/Forum.entity";

class UserDto {
    id: string;
    name: string;
    email: string;
}

class PostDto {
    id: string;
    name: string;
    creation_date: Date;
    user: UserDto;
}

export class ForumFindDto {
    id: string;
    name: string;
    image_url?: string
    numberOfPosts: number;
    creator: UserDto;
    lastPost: PostDto | null;
}
export class ForumCreateDto extends PickType(ForumEntity, ['name', 'creation_date', 'creator_id'] as const) { }
