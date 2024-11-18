export interface IUserRoleRepository {
    generateRoles(): Promise<void>
}