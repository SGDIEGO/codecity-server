import { PartialType } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { UserEntity } from "src/core/domain/entities/User.entity";

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
export class UserUpdateDto extends PartialType(UserEntity) {}