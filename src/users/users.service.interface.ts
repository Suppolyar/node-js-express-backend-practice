import { type UserRegisterDto } from './dto/user-register.dto'
import { type UserLoginDto } from './dto/user-login.dto'
import { type UserModel } from '@prisma/client'

export interface IUsersService {
  createUser: (dto: UserRegisterDto) => Promise<UserModel | null>
  validateUser: (dto: UserLoginDto) => Promise<boolean>
}
