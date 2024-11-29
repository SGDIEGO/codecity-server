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

    async getThreadUnique(where: Prisma.ThreadWhereUniqueInput): Promise<Thread> {
        return await this.prisma.thread.findUnique({
            where
        })
    }
    async createThread(data: ThreadCreateDto): Promise<Thread> {
        return await this.prisma.thread.create({
            data: {
                ...data,
                id: randomUUID()
            }
        })
    }
    async updateThread(where: Prisma.ThreadWhereUniqueInput, data: ThreadUpdateDto): Promise<Thread> {
        return await this.prisma.thread.update({
            where,
            data
        })
    }

    async getAllThreads(where?: Prisma.ThreadWhereInput): Promise<Array<Thread>> {
        return await this.prisma.thread.findMany({
            where
        })
    }
}