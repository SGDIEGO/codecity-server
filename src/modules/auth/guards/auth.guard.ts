import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/shared/decorator/roles.decorator';
import { UserRole } from 'src/shared/enums/role.enums';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const validRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [],
    );
    if (!validRoles) return false;
    if (validRoles.length == 0) return false;

    const request = context.switchToHttp().getRequest();
    const roles = request.user;
    return true;
  }
}
