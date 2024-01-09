import { BaseController } from '../common/base.controller'
import { type NextFunction, type Response, type Request } from 'express'
import { HTTPError } from '../errors/http-error.class'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { ILogger } from '../logger/logger.interface'
import 'reflect-metadata'
import { type IUsersController } from './users.controller.interface'

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor (@inject(TYPES.ILogger) private readonly loggerService: ILogger) {
    super(loggerService)
    this.bindRouter([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login }
    ])
  }

  public login = (req: Request, res: Response, next: NextFunction): void => {
    next(new HTTPError(401, 'Auth Error', 'login'))
  }

  public register = (req: Request, res: Response, next: NextFunction): void => {
    this.ok(res, 'register')
  }
}
