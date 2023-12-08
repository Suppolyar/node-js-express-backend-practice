import { App } from './app'
import { LoggerService } from './logger/logger.service'
import { UsersController } from './users/users.controller'
import { ExceptionFilter } from './errors/exception.filter'

async function bootstrap (): Promise<void> {
  const logger = new LoggerService()
  const app = new App(logger, new UsersController(logger), new ExceptionFilter(logger))
  await app.init()
}

bootstrap()
  .then(() => {
  })
  .catch(e => {
    console.error(e)
  })
