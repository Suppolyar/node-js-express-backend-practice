import { type ILogObj, Logger } from 'tslog'
import { type ILogger } from './logger.interface'
export class LoggerService implements ILogger {
  public logger: Logger<ILogObj>

  constructor () {
    this.logger = new Logger()
  }

  log (...args: unknown[]): void {
    this.logger.info(...args)
  }

  error (...args: unknown[]): void {
    this.logger.error(...args)
  }

  warn (...args: unknown[]): void {
    this.logger.warn(...args)
  }
}
