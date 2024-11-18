import { Prisma } from "@prisma/client";

export class UserCreateDto implements Prisma.UserCreateInput {
    id: string;
    name?: string;
    email: string;
    password: string;
    interactions?: number;
    profile_url?: string;
    Forum?: Prisma.ForumCreateNestedManyWithoutCreatorInput;
    Message?: Prisma.MessageCreateNestedManyWithoutUserInput;
    Payments?: Prisma.PaymentsCreateNestedManyWithoutUserInput;
    user_role: Prisma.UserRoleCreateNestedOneWithoutUsersInput;
}
export class UserUpdateDto implements Prisma.UserUpdateInput {}