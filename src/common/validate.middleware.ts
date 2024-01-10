import { type IMiddleware } from './middleware.interface'
import { type NextFunction, type Request, type Response } from 'express'
import { type ClassConstructor, plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

export class ValidateMiddleware implements IMiddleware {
  constructor (private readonly classToValidate: ClassConstructor<object>) {
  }

  execute ({ body }: Request, response: Response, next: NextFunction): void {
    const instance = plainToClass(this.classToValidate, body)
    void validate(instance).then((errors) => {
      if (errors.length > 0) {
        response.status(422).send(errors)
      } else {
        next()
      }
    })
  }
}
