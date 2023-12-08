import express, { type Express } from 'express'
import { userRouter } from './users/users'
import { type Server } from 'http'
import { type LoggerService } from './logger/logger.service'

export class App {
  app: Express
  server: Server
  port: number
  logger: LoggerService
  constructor (logger: LoggerService) {
    this.app = express()
    this.port = 8000
    this.logger = logger
  }

  useRoutes (): void {
    this.app.use('/users', userRouter)
  }

  public async init (): Promise<void> {
    this.useRoutes()

    this.server = this.app.listen(this.port)
    this.logger.log(`Server started on http://localhost:${this.port}`)
  }
}
