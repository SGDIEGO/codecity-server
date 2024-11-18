import { IsString, Min } from "class-validator"
import { UserEntity } from "./User.entity"

export class UserRoleEntity {
    @IsString()
    id: string

    @Min(0)
    min_interactions: number

    users: UserEntity[]

}