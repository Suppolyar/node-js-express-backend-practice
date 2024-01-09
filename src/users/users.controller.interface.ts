import { type NextFunction, type Request, type Response } from 'express'

export interface IUsersController {
  login: (req: Request, res: Response, next: NextFunction) => void
  register: (req: Request, res: Response, next: NextFunction) => void
}