import { IsString } from "class-validator";

export class AuthResponseDto {
    @IsString()
    token: string

    @IsString()
    user_id: string
}