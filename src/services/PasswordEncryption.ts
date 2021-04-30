/* eslint-disable @typescript-eslint/no-non-null-assertion */
import argon2 from 'argon2'

export class PasswordEncryption {
  private static secret: Buffer

  private constructor() {
    PasswordEncryption.secret = Buffer.from(process.env.HASH_SECRET!)
  }

  public static init(): PasswordEncryption {
    return new PasswordEncryption()
  }

  public static async encrypt(plain: string): Promise<string> {
    const hash = await argon2.hash(plain, { secret: this.secret })
    return hash
  }

  public static async check(plain: string, hash: string): Promise<boolean> {
    const isSame = await argon2.verify(hash, plain, { secret: this.secret })
    return isSame
  }
}
