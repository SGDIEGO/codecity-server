import { ApiProperty } from "@nestjs/swagger"
import { IsString, Min, IsDate, IsNotEmpty, IsDateString } from "class-validator"

export class ForumEntity {
    @ApiProperty()
    @IsString()
    id: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @Min(0)
    total_users: number
    
    @ApiProperty()
    @Min(0)
    total_likes: number
    
    @ApiProperty()
    @Min(0)
    total_messages: number
    
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    creation_date: Date

    @ApiProperty()
    @IsString()
    creator_id: string
}