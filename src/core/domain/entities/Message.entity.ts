import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class MessageEntity {
    @ApiProperty()
    @IsString()
    id: string

    @ApiProperty()
    @IsString()
    content: string

    @ApiProperty()
    @IsNumber()
    @Min(0)
    likes: number

    @ApiProperty()
    @IsNumber()
    @Min(0)
    dislikes: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    user_id: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    thread_id: string

    @ApiProperty()
    parent_message_id?: string | null
}