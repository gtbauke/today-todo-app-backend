import { PrismaClient } from '.prisma/client'

export class DatabaseClient {
  public static client: PrismaClient

  private constructor() {
    DatabaseClient.client = new PrismaClient()
  }

  public static init(): DatabaseClient {
    return new DatabaseClient()
  }
}
