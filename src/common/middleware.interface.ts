import { type Request, type Response, type NextFunction } from 'express'

export interface IMiddleware {
  execute: (req: Request, response: Response, next: NextFunction) => void
}
