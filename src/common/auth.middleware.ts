import { type IMiddleware } from './middleware.interface'
import { type Request, type Response, type NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export class AuthMiddleware implements IMiddleware {
  constructor (private readonly secret: string) {}

  execute (req: Request, res: Response, next: NextFunction): void {
    if (req.headers.authorization != null) {
      verify(
        req.headers.authorization.split(' ')[1],
        this.secret,
        (error, payload) => {
          if (error != null) {
            next()
          } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            req.user = payload.email
            next()
          }
        })
    }
    next()
  }
}
