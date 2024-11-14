import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { UserRole } from '../enums/role.enums';

export const ROLES_KEY = 'roles';
export const RolesProtected = (
  ...roles: UserRole[]
): CustomDecorator<string> => {
  return SetMetadata(ROLES_KEY, roles);
};
