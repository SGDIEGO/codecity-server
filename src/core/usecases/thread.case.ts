import { Injectable } from "@nestjs/common";
import { IThreadRespository } from "../domain/repositories/thread.repository";
import { Thread, Prisma } from "@prisma/client";
import { PrismaService } from "src/common/infraestructure/database/prisma.service";

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
    async createThread(data: Prisma.ThreadCreateInput): Promise<Thread> {
        return await this.prisma.thread.create({
            data
        })
    }
    async updateThread(where: Prisma.ThreadWhereUniqueInput, data: Prisma.ThreadUpdateInput): Promise<Thread> {
        return await this.prisma.thread.update({
            where,
            data
        })
    }

    async getAllThreads(): Promise<Array<Thread>> {
        return await this.prisma.thread.findMany()
    }
}