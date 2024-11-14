import { Prisma, User } from '@prisma/client';
import { UserSigninDto, UserSignupDto } from 'src/modules/auth/dto/user.dto';

export interface IUserRepository {
  find(id: Prisma.UserWhereUniqueInput): Promise<User>;
  create(user: Prisma.UserCreateInput): Promise<User>;
}
