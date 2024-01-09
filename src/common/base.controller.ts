import { Router, type Response } from 'express'
import { type RouteInterface } from './route.interface'
import { type ILogger } from '../logger/logger.interface'
import { injectable } from 'inversify'
import 'reflect-metadata'

@injectable()
export abstract class BaseController {
  private readonly _router: Router
  constructor (private readonly logger: ILogger) {
    this._router = Router()
  }

  get router (): Router {
    return this._router
  }

  public send<T> (res: Response, code: number, message: T): Response {
    res.type('applications/json')
    return res.status(code).json(message)
  }

  public ok<T>(res: Response, message: T): Response {
    return this.send<T>(res, 200, message)
  }

  public created (res: Response): Response {
    return res.sendStatus(201)
  }

  protected bindRouter (routes: RouteInterface[]): void {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`)
      const handler = route.func.bind(this)
      this.router[route.method](route.path, handler)
    }
  }
}
