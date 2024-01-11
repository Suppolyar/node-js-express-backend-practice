import { BaseController } from '../common/base.controller'
import { type NextFunction, type Response, type Request } from 'express'
import { HTTPError } from '../errors/http-error.class'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { ILogger } from '../logger/logger.interface'
import 'reflect-metadata'
import { type IUsersController } from './users.controller.interface'
import { UserLoginDto } from './dto/user-login.dto'
import { UserRegisterDto } from './dto/user-register.dto'
import { ValidateMiddleware } from '../common/validate.middleware'
import { sign } from 'jsonwebtoken'
import { IConfigService } from '../config/config.service.interface'
import { IUsersService } from './users.service.interface'
import { AuthGuard } from '../common/auth.guard'

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor (
    @inject(TYPES.ILogger) private readonly loggerService: ILogger,
    @inject(TYPES.UsersService) private readonly userService: IUsersService,
    @inject(TYPES.ConfigService) private readonly configService: IConfigService
  ) {
    super(loggerService)
    this.bindRouter([
      { path: '/register', method: 'post', func: this.register, middlewares: [new ValidateMiddleware(UserRegisterDto)] },
      { path: '/login', method: 'post', func: this.login, middlewares: [new ValidateMiddleware(UserLoginDto)] },
      { path: '/info', method: 'get', func: this.info, middlewares: [new AuthGuard()] }
    ])
  }

  public login = async (req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> => {
    const result = await this.userService.validateUser(req.body)
    if (!result) {
      return next(new HTTPError(401, 'Auth Error', 'login'))
    }
    const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'))
    this.ok(res, { jwt })
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
        name: result.name,
        id: result.id
      })
    }
  }

  public info = async (
    { user }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userInfo = await this.userService.getUserInfo(user)
    this.ok(res, {
      email: userInfo?.email,
      id: userInfo?.id
    })
  }

  private async signJWT (email: string, secret: string): Promise<string> {
    return await new Promise((resolve, reject) => {
      sign({
        email,
        iat: Math.floor(Date.now() / 1000)
      },
      secret,
      { algorithm: 'HS256' },
      (error, token) => {
        if (error != null) { reject(error) }

        resolve(token as string)
      })
    })
  }
}
