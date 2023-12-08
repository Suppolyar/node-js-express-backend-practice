import { App } from './app'
import { LoggerService } from './logger/logger.service'

async function bootstrap (): Promise<void> {
  const app = new App(new LoggerService())
  await app.init()
}

bootstrap().then(() => {
  console.log('Success')
}).catch(e => {
  console.error(e)
})
