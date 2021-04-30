import { User } from '.prisma/client'

export interface UserResponse {
  id: string
  name: string
  email: string
}

export class UsersView {
  public static single(user: User): UserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }

  public static many(users: User[]): UserResponse[] {
    return users.map(this.single)
  }
}
