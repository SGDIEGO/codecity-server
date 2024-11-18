import { Prisma, User } from '@prisma/client';
import { UserSigninDto, UserSignupDto } from 'src/modules/auth/dto/auth.dto';

export interface IUserRepository {
  getAll(): Promise<Array<User>>;
  find(id: Prisma.UserWhereInput): Promise<User>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<User>;
}
