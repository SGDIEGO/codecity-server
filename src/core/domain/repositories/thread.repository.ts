import { Prisma, Thread } from "@prisma/client";
import { ThreadCreateDto, ThreadUpdateDto } from "src/modules/thread/dto/thread.dto";
import { ThreadDto } from "../dto/thread.dto";

export interface IThreadRespository {
    getAllThreads(where?: Prisma.ThreadWhereInput): Promise<ThreadDto[]>
    getThreadUnique(where: Prisma.ThreadWhereInput): Promise<ThreadDto | null>
    createThread(threadDto: ThreadCreateDto): Promise<Thread>
    updateThread(where: Prisma.ThreadWhereUniqueInput, threadDto: ThreadUpdateDto): Promise<Thread>
}