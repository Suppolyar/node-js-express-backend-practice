import { type NextFunction, type Request, type Response, type Router } from 'express'

export interface RouteInterface {
  path: string
  func: (req: Request, res: Response, next: NextFunction) => void
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'put' | 'patch'>
}
