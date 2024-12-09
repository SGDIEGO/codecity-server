import { User } from "@prisma/client";
import { IsString } from "class-validator";
import { UserEntity } from "src/core/domain/entities/User.entity";
import { UserSelectDto } from "src/modules/user/dto";
import { jwtPayload } from "src/shared/payload/auth.payload";

export class AuthResponseDto {
    @IsString()
    token: string

    @IsString()
    user: jwtPayload
}

export const AuthResponseDtoFunc = (token: string, userInfo: jwtPayload): AuthResponseDto => {
    return {
        token,
        user: {
            ...userInfo,
        }
    }
}