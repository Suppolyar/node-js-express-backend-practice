import express, { type Express } from 'express'
import { type Server } from 'http'
import { type UsersController } from './users/users.controller'
import { type ExceptionFilter } from './errors/exception.filter'
import { type ILogger } from './logger/logger.interface'

export class App {
  app: Express
  server: Server
  port: number
  logger: ILogger
  userController: UsersController
  exceptionFilter: ExceptionFilter
  constructor (logger: ILogger, userController: UsersController, exceptionFilter: ExceptionFilter) {
    this.app = express()
    this.port = 8000
    this.logger = logger
    this.userController = userController
    this.exceptionFilter = exceptionFilter
  }

  useRoutes (): void {
    this.app.use('/users', this.userController.router)
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
