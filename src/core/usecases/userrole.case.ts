import { PrismaService } from "src/common/infraestructure/database/prisma.service";
import { IUserRoleRepository } from "../domain/repositories/userroles.repository";
import { UserRole, UserRoleMinTransactions, UserRolesArray } from "src/shared/enums/role.enums";

export class UserRoleRepository implements IUserRoleRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async generateRoles(): Promise<void> {
        await this.prisma.userRole.deleteMany()
        await this.prisma.userRole.createMany({
            data: UserRolesArray
        })
    };
}