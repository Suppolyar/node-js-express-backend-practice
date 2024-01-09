import express, { type Express } from 'express'
import { type Server } from 'http'
import { type UsersController } from './users/users.controller'
import { type ExceptionFilter } from './errors/exception.filter'
import { type ILogger } from './logger/logger.interface'
import { inject, injectable } from 'inversify'
import { TYPES } from './types'
import 'reflect-metadata'
@injectable()
export class App {
  app: Express
  server: Server
  port: number

  constructor (
    @inject(TYPES.ILogger) private readonly logger: ILogger,
    @inject(TYPES.UsersController) private readonly usersController: UsersController,
    @inject(TYPES.ExceptionFilter) private readonly exceptionFilter: ExceptionFilter

  ) {
    this.app = express()
    this.port = 8000
  }

  useRoutes (): void {
    this.app.use('/users', this.usersController.router)
  }

  useExceptionsFilters (): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
  }

  public async init (): Promise<void> {
    this.useRoutes()
    this.useExceptionsFilters()

    this.server = this.app.listen(this.port)
    this.logger.log(`Server started on http://localhost:${this.port}`)
  }
}
