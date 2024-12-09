import { Prisma, User } from '@prisma/client';
import { UserSigninDto, UserSignupDto } from 'src/modules/auth/dto/auth.dto';
import { UserSelectDto } from 'src/modules/user/dto';

export interface IUserRepository {
  getAll(): Promise<Array<User>>;
  find(where: Prisma.UserWhereInput, select?: Prisma.UserSelect);
  create(data: Prisma.UserCreateInput);
  update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput);
  getUser(where: Prisma.UserWhereUniqueInput)
}
