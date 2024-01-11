import { type IMiddleware } from './middleware.interface'
import { type Request, type Response, type NextFunction } from 'express'

export class AuthGuard implements IMiddleware {
  execute (req: Request, response: Response, next: NextFunction): void {
    if (req.user !== undefined) {
      return next()
    }
    response.status(401).send({ error: 'Not authorization' })
  }
}
