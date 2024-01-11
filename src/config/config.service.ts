import { type IConfigService } from './config.service.interface'
import { config, type DotenvConfigOutput, type DotenvParseOutput } from 'dotenv'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { ILogger } from '../logger/logger.interface'

@injectable()
export class ConfigService implements IConfigService {
  private readonly config: DotenvParseOutput
  constructor (@inject(TYPES.ILogger) private readonly logger: ILogger) {
    const result: DotenvConfigOutput = config()
    if (result.error != null) {
      this.logger.error('[ConfigService] The file .env could not be read')
    } else {
      this.logger.log('[ConfigService] .env is loaded')
      this.config = result.parsed as DotenvParseOutput
    }
  }

  get (key: string): string {
    return this.config[key]
  }
}
