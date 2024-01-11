import { Container, ContainerModule, type interfaces } from 'inversify'
import { type ILogger } from './logger/logger.interface'
import { LoggerService } from './logger/logger.service'
import { TYPES } from './types'
import { ExceptionFilter } from './errors/exception.filter'
import { UsersController } from './users/users.controller'
import { App } from './app'
import { type IExceptionFilter } from './errors/exception.filter.interface'
import { UsersService } from './users/users.service'
import { type IUsersService } from './users/users.service.interface'
import { type IUsersController } from './users/users.controller.interface'
import { type IConfigService } from './config/config.service.interface'
import { ConfigService } from './config/config.service'
import { PrismaService } from './db/prisma.service'
import { type IUsersRepository } from './users/users.repository.interface'
import { UsersRepository } from './users/users.repository'

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope()
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
  bind<IUsersController>(TYPES.UsersController).to(UsersController)
  bind<IUsersService>(TYPES.UsersService).to(UsersService)
  bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository)
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope()
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope()
  bind<App>(TYPES.Application).to(App).inSingletonScope()
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
