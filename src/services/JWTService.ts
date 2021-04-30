import jwt from 'jsonwebtoken'

export class JWTService {
  private static secret: string

  private constructor() {
    JWTService.secret = process.env.JWT_SECRET || ''
  }

  public static init(): JWTService {
    return new JWTService()
  }

  public static async sign(payload: { id: string }): Promise<string> {
    return jwt.sign(payload, JWTService.secret)
  }

  public static async decode(token: string): Promise<string> {
    return jwt.verify(token, JWTService.secret) as string
  }
}
