import { Message, Prisma } from "@prisma/client";
import { MessageFindDto } from "../dto/message.dto";
import { InteractionMessageUserDto, MessageCreateDto, MessageUniqueDto, MessageUpdateDto, MessageWhereUpdateDto } from "src/modules/message/dto/message.dto";

export interface IMessageRepository {
    getAllMessages(where?: MessageUniqueDto): Promise<Array<MessageFindDto>>
    getMessageUnique(where: MessageUniqueDto): Promise<MessageFindDto>
    createMessage(xdata: MessageCreateDto)
    updateMessage(where: MessageWhereUpdateDto, messageDto: MessageUpdateDto): Promise<Message>
    deleteMessage(where: MessageUniqueDto): Promise<Message>

    likeMessage(interactionUser: InteractionMessageUserDto): Promise<void>
    disLikeMessage(interactionUser: InteractionMessageUserDto): Promise<void>
}