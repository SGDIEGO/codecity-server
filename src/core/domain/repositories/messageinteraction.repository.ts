import { MessageInteractions } from "@prisma/client";
import { MessageInteractionUniqueDto } from "src/modules/messageinteraction/dto/messageinteraction.dto";

export interface IMessageInteractionRepository {
    findAll(where: MessageInteractionUniqueDto): Promise<MessageInteractions>
}
