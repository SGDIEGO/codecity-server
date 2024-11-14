import * as bcrypt from "bcrypt"
import { Injectable } from "@nestjs/common";

@Injectable()
export class EncryptService {
    private salt: string
    constructor() {
        this.salt = bcrypt.genSaltSync()
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.salt)
    }

    async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword)
    }
}