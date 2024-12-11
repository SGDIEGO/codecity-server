import { Injectable } from "@nestjs/common";
import { IThreadRespository } from "../domain/repositories/thread.repository";
import { Thread, Prisma } from "@prisma/client";
import { PrismaService } from "src/common/infraestructure/database/prisma.service";
import { randomUUID } from "crypto";
import { ThreadCreateDto, ThreadUpdateDto } from "src/modules/thread/dto/thread.dto";

@Injectable()
export class ThreadRepository implements IThreadRespository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async getThreadUnique(where: Prisma.ThreadWhereUniqueInput) {
        const thread = await this.prisma.thread.findUnique({
            where,
            select: {
                id: true,
                name: true,
                image_url: true,
                private: true,
                creation_date: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                _count: {
                    select: {
                        Message: true,
                    },
                },
                Message: {
                    orderBy: {
                        creation_date: 'desc',
                    },
                    take: 1,
                    select: {
                        id: true,
                        content: true,
                        creation_date: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });

        if (!thread) {
            return null;
        }

        return {
            id: thread.id,
            name: thread.name,
            creator: thread.user,
            image_url: thread.image_url,
            creation_date: thread.creation_date,
            numberOfMessages: thread._count.Message,
            lastMessage: thread.Message[0] ? {
                id: thread.Message[0].id,
                content: thread.Message[0].content,
                creation_date: thread.Message[0].creation_date,
                user: thread.Message[0].user,
            } : null,
            private: thread.private,
        };
    }
    async createThread(data: ThreadCreateDto){
        await this.prisma.$transaction([
            this.prisma.thread.create({
                data: {
                    ...data,
                    id: randomUUID()
                }
            }),
            this.prisma.user.update({
                where: { id: data.user_id },
                data: { interactions: { increment: 10 } }
            })
        ])
    }
    async updateThread(where: Prisma.ThreadWhereUniqueInput, data: ThreadUpdateDto): Promise<Thread> {
        return await this.prisma.thread.update({
            where,
            data
        })
    }

    async getAllThreads(where?: Prisma.ThreadWhereInput) {
        const threads = await this.prisma.thread.findMany({
            where,
            select: {
                id: true,
                name: true,
                image_url: true,
                creation_date: true,
                private: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                _count: {
                    select: {
                        Message: true,
                    },
                },
                Message: {
                    orderBy: {
                        creation_date: 'desc',
                    },
                    take: 1,
                    select: {
                        id: true,
                        content: true,
                        creation_date: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });

        return threads.map(thread => ({
            id: thread.id,
            name: thread.name,
            creator: thread.user,
            creation_date: thread.creation_date,
            image_url: thread.image_url,
            numberOfMessages: thread._count.Message,
            lastMessage: thread.Message[0] ? {
                id: thread.Message[0].id,
                content: thread.Message[0].content,
                creation_date: thread.Message[0].creation_date,
                user: thread.Message[0].user,
            } : null,
            private: thread.private,
        }));
    }
}