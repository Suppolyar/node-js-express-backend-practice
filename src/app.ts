import express, { type Express } from 'express'
import { type Server } from 'http'
import { type LoggerService } from './logger/logger.service'
import { type UsersController } from './users/users.controller'

export class App {
  app: Express
  server: Server
  port: number
  logger: LoggerService
  userController: UsersController
  constructor (logger: LoggerService, userController: UsersController) {
    this.app = express()
    this.port = 8000
    this.logger = logger
    this.userController = userController
  }

  useRoutes (): void {
    this.app.use('/users', this.userController.router)
  }

  public async init (): Promise<void> {
    this.useRoutes()

    this.server = this.app.listen(this.port)
    this.logger.log(`Server started on http://localhost:${this.port}`)
  }
}
