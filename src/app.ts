import express, { type Express } from 'express'
import { type Server } from 'http'
import { type ILogger } from './logger/logger.interface'
import { inject, injectable } from 'inversify'
import { json } from 'body-parser'
import { TYPES } from './types'
import 'reflect-metadata'
import { IConfigService } from './config/config.service.interface'
import { IExceptionFilter } from './errors/exception.filter.interface'
import { UsersController } from './users/users.controller'
import { PrismaService } from './db/prisma.service'
@injectable()
export class App {
  app: Express
  server: Server
  port: number

  constructor (
    @inject(TYPES.ILogger) private readonly logger: ILogger,
    @inject(TYPES.UsersController) private readonly usersController: UsersController,
    @inject(TYPES.ExceptionFilter) private readonly exceptionFilter: IExceptionFilter,
    @inject(TYPES.ConfigService) private readonly configService: IConfigService,
    @inject(TYPES.PrismaService) private readonly prismaService: PrismaService
  ) {
    this.app = express()
    this.port = 8000
  }

  useMiddleware (): void {
    this.app.use(json())
  }

  useRoutes (): void {
    this.app.use('/users', this.usersController.router)
  }

  useExceptionsFilters (): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
  }

  public async init (): Promise<void> {
    this.useMiddleware()
    this.useRoutes()
    this.useExceptionsFilters()

    await this.prismaService.connect()

    this.server = this.app.listen(this.port)
    this.logger.log(`Server started on http://localhost:${this.port}`)
  }
}
