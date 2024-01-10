import { BaseController } from '../common/base.controller'
import { type NextFunction, type Response, type Request } from 'express'
import { HTTPError } from '../errors/http-error.class'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { ILogger } from '../logger/logger.interface'
import 'reflect-metadata'
import { type IUsersController } from './users.controller.interface'
import { type UserLoginDto } from './dto/user-login.dto'
import { type UserRegisterDto } from './dto/user-register.dto'
import { User } from './user.entity'
import { UsersService } from './users.service'

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor (
    @inject(TYPES.ILogger) private readonly loggerService: ILogger,
    @inject(TYPES.UsersService) private readonly userService: UsersService
  ) {
    super(loggerService)
    this.bindRouter([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login }
    ])
  }

  public login = (req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void => {
    console.log(req.body)
    next(new HTTPError(401, 'Auth Error', 'login'))
  }

  public register = async (
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const result = await this.userService.createUser(body)

    if (result === null) {
      next(new HTTPError(422, 'User is exist'))
    } else {
      this.ok(res, {
        email: result.email,
        name: result.name
      })
    }
  }
}
