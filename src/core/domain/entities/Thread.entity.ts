import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

class Thread {
    @IsString()
    id: string

    @IsString()
    name: string

    @IsNumber()
    @Min(0)
    total_users: number

    @IsNumber()
    @Min(0)
    total_likes: number

    @IsNumber()
    @Min(0)
    total_messages: number

    @IsDate()
    creation_date: Date

    @IsBoolean()
    private: boolean

    @IsNumber()
    access_price: number

    @IsString()
    image_url: string

    @IsString()
    @IsNotEmpty()
    forum_id: string
}