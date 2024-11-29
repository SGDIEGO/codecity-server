import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsDateString, IsEmpty, IsNotEmpty, IsNumber, IsString, Min, ValidateIf } from "class-validator"

export class ThreadEntity {
    @ApiProperty()
    @IsString()
    id: string

    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNumber()
    @Min(0)
    total_users: number

    @ApiProperty()
    @IsNumber()
    @Min(0)
    total_likes: number

    @ApiProperty()
    @IsNumber()
    @Min(0)
    total_messages: number

    @ApiProperty()
    @IsDateString()
    creation_date: Date

    @ApiProperty()
    @IsBoolean()
    private: boolean

    @ApiProperty({ required: false })
    @IsNumber()
    @ValidateIf((obj) => obj.access_price !== null && obj.access_price !== '')
    access_price: number | null

    @ApiProperty()
    @IsString()
    image_url: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    forum_id: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    user_id: string
}