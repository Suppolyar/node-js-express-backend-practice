import { type NextFunction, type Request, type Response, type Router } from 'express'
import { type IMiddleware } from './middleware.interface'

export interface RouteInterface {
  path: string
  func: (req: Request, res: Response, next: NextFunction) => Promise<void>
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'put' | 'patch'>
  middlewares?: IMiddleware[]
}
