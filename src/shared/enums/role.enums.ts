import { randomUUID } from "crypto";

export enum UserRole {
  Student = 'student',
  Trainee = 'trainee',
  Junior = 'junior',
  Middle = 'middle',
  Senior = 'senior',
  Staff = 'staff',
}

export enum UserRoleMinTransactions {
  Student = 0,
  Trainee = 10,
  Junior = 50,
  Middle = 100,
  Senior = 500,
  Staff = 1000,
}

export const UserRolesArray = [
  {
    id: randomUUID(),
    name: UserRole.Student,
    min_interactions: UserRoleMinTransactions.Student,
  },
  {
    id: randomUUID(),
    name: UserRole.Trainee,
    min_interactions: UserRoleMinTransactions.Trainee,
  },
  {
    id: randomUUID(),
    name: UserRole.Junior,
    min_interactions: UserRoleMinTransactions.Junior,
  },
  {
    id: randomUUID(),
    name: UserRole.Middle,
    min_interactions: UserRoleMinTransactions.Middle,
  },
  {
    id: randomUUID(),
    name: UserRole.Senior,
    min_interactions: UserRoleMinTransactions.Senior,
  },
  {
    id: randomUUID(),
    name: UserRole.Staff,
    min_interactions: UserRoleMinTransactions.Staff,
  },
]