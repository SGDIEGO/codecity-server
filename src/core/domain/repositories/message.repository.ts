import { Message, Prisma } from "@prisma/client";
import { InteractionMessageUserDto, MessageCreateDto, MessageUniqueDto, MessageUpdateDto } from "src/modules/message/dto/message.dto";

export interface IMessageRepository {
    getAllMessages(where?: MessageUniqueDto): Promise<Array<Message>>
    getMessageUnique(where: MessageUniqueDto): Promise<Message>
    createMessage(messageDto: MessageCreateDto): Promise<Message>
    updateMessage(where: MessageUniqueDto, messageDto: MessageUpdateDto): Promise<Message>

    likeMessage(interactionUser: InteractionMessageUserDto): Promise<void>
    disLikeMessage(interactionUser: InteractionMessageUserDto): Promise<void>
}