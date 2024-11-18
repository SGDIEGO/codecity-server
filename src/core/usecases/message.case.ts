import { Message, Prisma } from "@prisma/client";
import { IMessageRepository } from "../domain/repositories";
import { PrismaService } from "src/common/infraestructure/database/prisma.service";

export class MessageRepository implements IMessageRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async getAllMessages(): Promise<Array<Message>> {
        return await this.prisma.message.findMany()
    }
    async getMessageUnique(where: Prisma.MessageWhereInput): Promise<Message> {
        return await this.prisma.message.findFirst({
            where
        })
    }
    async createMessage(data: Prisma.MessageCreateInput): Promise<Message> {
        return await this.prisma.message.create({
            data
        })
    }
    async updateMessage(where: Prisma.MessageWhereUniqueInput, data: Prisma.MessageUpdateInput): Promise<Message> {
        return await this.prisma.message.update({
            where,
            data
        })
    }

}