import { Container, ContainerModule, type interfaces } from 'inversify'
import { type ILogger } from './logger/logger.interface'
import { LoggerService } from './logger/logger.service'
import { TYPES } from './types'
import { ExceptionFilter } from './errors/exception.filter'
import { UsersController } from './users/users.controller'
import { App } from './app'
import { type IExceptionFilter } from './errors/exception.filter.interface'

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService)
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
  bind<UsersController>(TYPES.UsersController).to(UsersController)
  bind<App>(TYPES.Application).to(App)
})

function bootstrap (): { appContainer: Container, app: App } {
  const appContainer = new Container()
  appContainer.load(appBindings)
  const app = appContainer.get<App>(TYPES.Application)
  void app.init()

  return { appContainer, app }
}

export const {
  app,
  appContainer
} = bootstrap()
