import { Prisma, Thread } from "@prisma/client";

export interface IThreadRespository {
    getAllThreads(): Promise<Array<Thread>>
    getThreadUnique(where: Prisma.ThreadWhereInput): Promise<Thread>
    createThread(threadDto: Prisma.ThreadCreateInput): Promise<Thread>
    updateThread(where: Prisma.ThreadWhereUniqueInput, threadDto: Prisma.ThreadUpdateInput): Promise<Thread>
}