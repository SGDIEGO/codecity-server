import { IsDate, IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class Message {
    @IsString()
    id: string

    @IsString()
    content: string

    @IsNumber()
    @Min(0)
    likes: number

    @IsNumber()
    @Min(0)
    dislikes: number

    @IsString()
    @IsNotEmpty()
    id_thread: string

    @IsString()
    @IsNotEmpty()
    id_user: string

    @IsString()
    @IsNotEmpty()
    id_parent_message: string
}