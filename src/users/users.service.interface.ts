import { type UserRegisterDto } from './dto/user-register.dto'
import { type User } from './user.entity'
import { type UserLoginDto } from './dto/user-login.dto'

export interface IUsersService {
  createUser: (dto: UserRegisterDto) => Promise<User | null>
  validateUser: (dto: UserLoginDto) => Promise<boolean>
}
