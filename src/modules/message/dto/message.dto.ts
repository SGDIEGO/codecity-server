import { OmitType, PartialType, PickType } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { MessageEntity } from "src/core/domain/entities/Message.entity";

export class MessageUniqueDto extends PartialType(MessageEntity) { }
export class MessageWhereUpdateDto extends PickType(MessageEntity, ['id']) { }
export class MessageCreateDto extends PickType(MessageEntity, ['content', 'user_id', 'parent_message_id', 'thread_id']) { }
export class MessageUpdateDto extends PickType(MessageEntity, ['content']) { }

export class InteractionMessageUserDto extends PickType(MessageEntity, ['id', 'user_id']) { }