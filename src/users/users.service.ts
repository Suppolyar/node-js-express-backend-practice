import { type IUsersService } from './users.service.interface'
import { type UserRegisterDto } from './dto/user-register.dto'
import { type UserLoginDto } from './dto/user-login.dto'
import { User } from './user.entity'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { IConfigService } from '../config/config.service.interface'
import { IUsersRepository } from './users.repository.interface'
import { type UserModel } from '@prisma/client'

@injectable()
export class UsersService implements IUsersService {
  constructor (
    @inject(TYPES.ConfigService) private readonly configService: IConfigService,
    @inject(TYPES.UsersRepository) private readonly usersRepository: IUsersRepository
  ) {
  }

  async createUser ({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
    const newUser = new User(email, name)
    const salt = this.configService.get('SALT')
    await newUser.setPassword(password, Number(salt))

    const existedUser = await this.usersRepository.find(email)
    if (existedUser != null) {
      return null
    } else {
      return await this.usersRepository.create(newUser)
    }
  }

  async validateUser ({ email, password }: UserLoginDto): Promise<boolean> {
    const existedUser = await this.usersRepository.find(email)
    if (existedUser == null) return false

    const newUser = new User(existedUser?.email, existedUser?.name, existedUser.password)
    return await newUser.comparePassword(password)
  }

  async getUserInfo (email: string): Promise<UserModel | null> {
    return await this.usersRepository.find(email)
  }
}
