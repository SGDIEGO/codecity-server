import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Min } from "class-validator"

export class UserEntity {
    @ApiProperty()
    @IsString()
    id: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string

    @ApiProperty()
    @Min(0)
    interactions: number

    @ApiProperty()
    @IsString()
    profile_url: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    user_role_id: string
}