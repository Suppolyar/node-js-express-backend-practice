import { type IUsersRepository } from './users.repository.interface'
import { type User } from './user.entity'
import { type UserModel } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { PrismaService } from '../db/prisma.service'

@injectable()
export class UsersRepository implements IUsersRepository {
  constructor (@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {
  }

  async create ({ email, password, name }: User): Promise<UserModel> {
    const result = await this.prismaService.client.userModel.create({
      data: {
        email,
        password,
        name
      }
    })

    return result
  }

  async find (email: string): Promise<UserModel | null> {
    const result = await this.prismaService.client.userModel.findFirst({
      where: {
        email
      }
    })

    return result
  }
}
