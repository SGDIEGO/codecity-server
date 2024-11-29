import { OmitType, PartialType, PickType } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { MessageEntity } from "src/core/domain/entities/Message.entity";

export class MessageUniqueDto extends PartialType(MessageEntity) {
    id: string
    thread_id?: string;
    user_id?: string;
}
export class MessageCreateDto extends PickType(MessageEntity, ['content', 'user_id', 'parent_message_id', 'thread_id']) { }
export class MessageUpdateDto extends PickType(MessageEntity, ['content']) { }

export class InteractionMessageUserDto extends PickType(MessageEntity, ['id', 'user_id']) { }