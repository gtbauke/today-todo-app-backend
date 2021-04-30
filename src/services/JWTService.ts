import jwt from 'jsonwebtoken'

export class JWTService {
  private static secret: string

  private constructor() {
    JWTService.secret = process.env.JWT_SECRET || ''
  }

  public static init(): JWTService {
    return new JWTService()
  }

  public static async sign(userId: string): Promise<string> {
    return jwt.sign(userId, JWTService.secret)
  }

  public static async decode(token: string): Promise<string> {
    const result = jwt.verify(token, JWTService.secret)
    return result as string
  }
}
