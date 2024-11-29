import { PartialType } from "@nestjs/swagger";
import { MessageInteractionsEntity } from "src/core/domain/entities/MessageInteractions";

export class MessageInteractionUniqueDto extends PartialType(MessageInteractionsEntity) {}