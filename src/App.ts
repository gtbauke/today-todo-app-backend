import express, { Router } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { Server } from 'http'

interface IService<T = unknown> {
  init(): T
}

export class App {
  private readonly express: express.Application

  public constructor() {
    this.express = express()

    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(morgan('dev'))
    this.express.use(helmet())
  }

  public registerServices(services: IService[]): void {
    services.forEach(service => service.init())
  }

  public registerRoutes(routers: Router[]): void {
    routers.forEach(router => this.express.use(router))
  }

  public listen(port: string | number, callback?: () => void): Server {
    return this.express.listen(port, callback)
  }
}
