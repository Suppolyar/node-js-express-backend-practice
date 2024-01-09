import { Container } from 'inversify'
import { type ILogger } from './logger/logger.interface'
import { LoggerService } from './logger/logger.service'
import { TYPES } from './types'
import { ExceptionFilter } from './errors/exception.filter'
import { UsersController } from './users/users.controller'
import { App } from './app'
import { type IExceptionFilter } from './errors/exception.filter.interface'

const appContainer = new Container()
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService)
appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
appContainer.bind<UsersController>(TYPES.UsersController).to(UsersController)
appContainer.bind<App>(TYPES.Application).to(App)

const app = appContainer.get<App>(TYPES.Application)

void app.init()

export {
  app,
  appContainer
}
