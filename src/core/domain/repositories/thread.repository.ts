import { Prisma, Thread } from "@prisma/client";
import { ThreadCreateDto, ThreadUpdateDto } from "src/modules/thread/dto/thread.dto";

export interface IThreadRespository {
    getAllThreads(where?: Prisma.ThreadWhereInput): Promise<Array<Thread>>
    getThreadUnique(where: Prisma.ThreadWhereInput): Promise<Thread>
    createThread(threadDto: ThreadCreateDto): Promise<Thread>
    updateThread(where: Prisma.ThreadWhereUniqueInput, threadDto: ThreadUpdateDto): Promise<Thread>
}