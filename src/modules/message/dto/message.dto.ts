import { Prisma } from "@prisma/client";

export interface MessageCreateDto extends Prisma.MessageCreateInput { }
export interface MessageUpdateDto extends Prisma.MessageUpdateInput { }