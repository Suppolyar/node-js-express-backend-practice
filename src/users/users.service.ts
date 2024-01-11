import { type IUsersService } from './users.service.interface'
import { type UserRegisterDto } from './dto/user-register.dto'
import { type UserLoginDto } from './dto/user-login.dto'
import { User } from './user.entity'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { IConfigService } from '../config/config.service.interface'

@injectable()
export class UsersService implements IUsersService {
  constructor (
    @inject(TYPES.ConfigService) private readonly configService: IConfigService
  ) {
  }

  async createUser ({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const newUser = new User(email, name)
    const salt = this.configService.get('SALT')
    await newUser.setPassword(password, Number(salt))
    return null
  }

  async validateUser (dto: UserLoginDto): Promise<boolean> {
    return true
  }
}
