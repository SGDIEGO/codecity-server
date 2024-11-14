import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt.guard';
import { UserRole } from 'src/shared/enums/role.enums';
import { RolesProtected } from 'src/shared/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

export function Auth(role: UserRole | void) {
  if (!role) return UseGuards(AuthGuard(), JwtAuthGuard)

  const keys = Object.values(UserRole)
  const roles = keys.slice(keys.indexOf(role)) as UserRole[]

  return applyDecorators(
    RolesProtected(...roles),
    UseGuards(AuthGuard(), JwtAuthGuard),
  );
}
