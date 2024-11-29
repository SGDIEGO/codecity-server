import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class MessageInteractionsEntity {

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    id: string


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    interaction_id: string


    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    user_id: string


    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    message_id: string
}