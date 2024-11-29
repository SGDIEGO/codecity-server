import { Message, Prisma } from "@prisma/client";
import { IMessageRepository } from "../domain/repositories";
import { PrismaService } from "src/common/infraestructure/database/prisma.service";
import { InteractionMessageUserDto, MessageCreateDto, MessageUniqueDto, MessageUpdateDto } from "src/modules/message/dto/message.dto";
import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MessageRepository implements IMessageRepository {
    constructor(private readonly prisma: PrismaService) { }
    async disLikeMessage(interactionUser: InteractionMessageUserDto): Promise<void> {
        const { id, user_id } = interactionUser
        const dislikeInteraction = await this.prisma.interaction.findUnique({
            where: {
                type: "dislike"
            }
        });

        await this.prisma.$transaction([
            this.prisma.message.update({
                where: { id },
                data: { dislikes: { increment: 1 } }
            }),
            this.prisma.messageInteractions.create({
                data: {
                    message_id: id,
                    user_id: user_id,
                    interaction_id: dislikeInteraction.id
                }
            }),
            this.prisma.user.update({
                where: { id: user_id },
                data: { interactions: { increment: 1 } }
            })
        ])
    }
    async likeMessage(interactionUser: InteractionMessageUserDto): Promise<void> {
        const { id, user_id } = interactionUser

        const likeInteraction = await this.prisma.interaction.findUnique({
            where: {
                type: "like"
            }
        });

        if (!likeInteraction) {
            throw new Error('Interaction type "like" not found');
        }

        await this.prisma.$transaction([
            this.prisma.message.update({
                where: { id },
                data: { likes: { increment: 1 } }
            }),

            this.prisma.messageInteractions.create({
                data: {
                    message_id: id,
                    user_id: user_id,
                    interaction_id: likeInteraction.id
                }
            }),

            this.prisma.user.update({
                where: { id: user_id },
                data: { interactions: { increment: 1 } }
            })
        ])
    }
    async getAllMessages(): Promise<Array<Message>> {
        return await this.prisma.message.findMany()
    }
    async getMessageUnique(where: Prisma.MessageWhereInput): Promise<Message> {
        return await this.prisma.message.findFirst({
            where
        })
    }
    async createMessage(data: MessageCreateDto): Promise<Message> {
        return await this.prisma.message.create({
            data: {
                ...data,
                id: randomUUID(),
            }
        })
    }
    async updateMessage(where: MessageUniqueDto, data: MessageUpdateDto): Promise<Message> {
        return await this.prisma.message.update({
            where,
            data
        })
    }

}