import { BaseController } from '../common/base.controller'
import { type LoggerService } from '../logger/logger.service'
import { type NextFunction, type Response, type Request } from 'express'

export class UsersController extends BaseController {
  constructor (logger: LoggerService) {
    super(logger)
    this.bindRouter([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login }
    ])
  }

  public login = (req: Request, res: Response, next: NextFunction): void => {
    this.ok(res, 'login')
  }

  public register = (req: Request, res: Response, next: NextFunction): void => {
    this.ok(res, 'register')
  }
}
