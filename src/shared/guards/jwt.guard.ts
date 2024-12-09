import {
  BadRequestException,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { User } from '@prisma/client';
import { UserRole } from '../enums/role.enums';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles = this.reflector.getAllAndOverride<Array<string>>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!validRoles) return true;
    if (validRoles.length == 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as any;

    if (!user || !user.user_role) throw new BadRequestException('User not found');

    if (validRoles.includes(user.user_role.name)) {
      return true;
    }

    throw new ForbiddenException(
      `User ${user.name} need a valid role: [${validRoles}]`,
    );
  }
}
