import { type NextFunction, type Request, type Response } from 'express'
import { type LoggerService } from '../logger/logger.service'
import { type ExceptionFilterInterface } from './exception.filter.interface'
import { HTTPError } from './http-error.class'

export class ExceptionFilter implements ExceptionFilterInterface {
  logger: LoggerService
  constructor (logger: LoggerService) {
    this.logger = logger
  }

  catch (err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof HTTPError) {
      this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`)
      res.status(err.statusCode).send({ err: err.message })
    } else {
      this.logger.error(`${err.message}`)
      res.status(500).send({ err: err.message })
    }
  }
}
