import { PrismaService } from "src/common/infraestructure/database/prisma.service";
import { SaveMessageDto } from "../domain/dto/chat.dto";
import { IChatRepository } from "../domain/repositories/chat.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ChatRepository implements IChatRepository {
    constructor(private readonly prisma: PrismaService) { }
    async getMessages(from: string, to: string) {
        try {
            return await this.prisma.messageUsers.findMany({
                where: {
                    OR: [
                        {
                            from: from,
                            to: to
                        },
                        {
                            from: to,
                            to: from
                        }
                    ]
                },
                select: {
                    content: true,
                    from: true,
                    to: true,
                    date: true
                }
            })
        } catch (error) {
            throw error;
        }
    }

    async saveMessage(data: SaveMessageDto) {
        try {
            await this.prisma.messageUsers.create({
                data: {
                    content: data.message,
                    from: data.from,
                    to: data.to,
                }
            })
        } catch (error) {
            throw error;
        }
    }
}