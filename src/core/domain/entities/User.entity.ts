import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class UserEntity {
    @IsString()
    id: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNumber()
    @Min(0)
    interactions: number

    @IsString()
    profile_url: string

    @IsNotEmpty()
    @IsString()
    user_role_id: string
}