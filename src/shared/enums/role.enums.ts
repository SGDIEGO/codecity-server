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
    id: UserRole.Student,
    min_interactions: UserRoleMinTransactions.Student,
  },
  {
    id: UserRole.Trainee,
    min_interactions: UserRoleMinTransactions.Trainee,
  },
  {
    id: UserRole.Junior,
    min_interactions: UserRoleMinTransactions.Junior,
  },
  {
    id: UserRole.Middle,
    min_interactions: UserRoleMinTransactions.Middle,
  },
  {
    id: UserRole.Senior,
    min_interactions: UserRoleMinTransactions.Senior,
  },
  {
    id: UserRole.Staff,
    min_interactions: UserRoleMinTransactions.Staff,
  },
]