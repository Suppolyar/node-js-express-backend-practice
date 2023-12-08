import express, { type Express } from 'express'
import { userRouter } from './users/users'
import { type Server } from 'http'

export class App {
  app: Express
  server: Server
  port: number
  constructor () {
    this.app = express()
    this.port = 8000
  }

  useRoutes (): void {
    this.app.use('/users', userRouter)
  }

  public async init (): Promise<void> {
    this.useRoutes()

    this.server = this.app.listen(this.port)
    console.log(`Server started on http://localhost:${this.port}`)
  }
}
