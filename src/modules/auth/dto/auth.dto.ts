import { PickType } from "@nestjs/swagger"
import { IsEmail, IsStrongPassword, isStrongPassword } from "class-validator";
import { UserEntity } from "src/core/domain/entities/User.entity";

export class UserSigninDto extends PickType(UserEntity, ['email', 'password'] as const) {
    @IsEmail()
    email: string;

    password: string;
}

export class UserSignupDto extends PickType(UserEntity, ['name', 'email', 'password'] as const) {
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;
}


export class UserSigninGoogleOauthDto extends PickType(UserEntity, ['email', 'name'] as const) {
    name: string
    @IsEmail()
    email: string;
}