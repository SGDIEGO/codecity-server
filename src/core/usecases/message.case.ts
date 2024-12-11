import { Message, Prisma } from "@prisma/client";
import { IMessageRepository } from "../domain/repositories";
import { PrismaService } from "src/common/infraestructure/database/prisma.service";
import { InteractionMessageUserDto, MessageCreateDto, MessageUpdateDto, MessageWhereUpdateDto } from "src/modules/message/dto/message.dto";
import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";
import { MessageFindDto } from "../domain/dto/message.dto";

@Injectable()
export class MessageRepository implements IMessageRepository {
    constructor(private readonly prisma: PrismaService) { }
    async disLikeMessage(interactionUser: InteractionMessageUserDto) {
        const { id, user_id } = interactionUser
        const dislikeInteraction = await this.prisma.interaction.findUnique({
            where: {
                type: "dislike"
            }
        });

        if (!dislikeInteraction) {
            throw new Error('Interaction type "dislike" not found');
        }

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
    async likeMessage(interactionUser: InteractionMessageUserDto) {
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
    async getAllMessages(where?: MessageFindDto) {
        const messages = await this.prisma.message.findMany({
            where,
            select: {
                id: true,
                content: true,
                likes: true,
                dislikes: true,
                creation_date: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        profile_url: true
                    },
                },
                parent_message: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        return messages.map(message => ({
            id: message.id,
            content: message.content,
            creator: message.user,
            likes: message.likes,
            dislikes: message.dislikes,
            creation_date: message.creation_date,
            parent_message: message.parent_message ? {
                id: message.parent_message.id,
            } : null,
        }));
    }
    async getMessageUnique(where: Prisma.MessageWhereInput) {
        const message = await this.prisma.message.findFirst({
            where,
            select: {
                id: true,
                content: true,
                likes: true,
                dislikes: true,
                creation_date: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        profile_url: true
                    },
                },
                parent_message: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        if (!message) {
            return null;
        }

        return {
            id: message.id,
            content: message.content,
            creator: message.user,
            likes: message.likes,
            dislikes: message.dislikes,
            creation_date: message.creation_date,
            parent_message: message.parent_message ? {
                id: message.parent_message.id,
            } : null,
        };
    }
    async createMessage(data: MessageCreateDto) {
        await this.prisma.$transaction([
            this.prisma.message.create({
                data: {
                    ...data,
                    id: randomUUID(),
                }
            }),
            this.prisma.user.update({
                where: { id: data.user_id },
                data: { interactions: { increment: 5 } }
            })
        ])
    }
    async updateMessage(where: MessageWhereUpdateDto, data: MessageUpdateDto) {
        return await this.prisma.message.update({
            where,
            data
        })
    }

    async deleteMessage(where: MessageFindDto) {
        return await this.prisma.message.delete({
            where: {
                id: where.id
            }
        })
    }
}