import { PickType } from "@nestjs/swagger"
import { UserEntity } from "src/core/domain/entities/User.entity";

export class UserSigninDto extends PickType(UserEntity, ['email', 'password'] as const) { }

export class UserSignupDto extends PickType(UserEntity, ['name', 'email', 'password'] as const) { }
