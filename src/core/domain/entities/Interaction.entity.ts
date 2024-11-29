import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class InteractionEntity {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    id: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type: string
}