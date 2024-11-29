import { MessageInteractions } from "@prisma/client";
import { PrismaService } from "src/common/infraestructure/database/prisma.service";
import { IMessageInteractionRepository } from "../domain/repositories/messageinteraction.repository";
import { MessageInteractionUniqueDto } from "src/modules/messageinteraction/dto/messageinteraction.dto";

export class MessageInteractionRepository implements IMessageInteractionRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async findAll(where: MessageInteractionUniqueDto): Promise<MessageInteractions> {
        return this.prisma.messageInteractions.findFirst({
            where
        })
    }
}