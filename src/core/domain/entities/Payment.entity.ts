import { IsDate, IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class Payments {
    @IsString()
    id: string

    @IsNotEmpty()
    @IsDate()
    start_access_date: Date

    @IsNotEmpty()
    @IsDate()
    end_access_date: Date

    @IsNotEmpty()
    @IsString()
    id_thread: string

    @IsNotEmpty()
    @IsString()
    id_user: string
}