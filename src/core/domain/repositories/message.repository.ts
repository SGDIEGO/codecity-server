import { Message, Prisma } from "@prisma/client";

export interface IMessageRepository {
    getAllMessages(): Promise<Array<Message>>
    getMessageUnique(where: Prisma.MessageWhereInput): Promise<Message>
    createMessage(messageDto: Prisma.MessageCreateInput): Promise<Message>
    updateMessage(where: Prisma.MessageWhereUniqueInput, messageDto: Prisma.MessageUpdateInput): Promise<Message>
} 