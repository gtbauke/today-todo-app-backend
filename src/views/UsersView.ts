import { User, Profile } from '.prisma/client'

export interface UserResponse {
  id: string
  name: string
  email: string
}

export interface LoginUserResponse {
  user: UserResponse
  token: string
}

export interface UserWithProfile {
  id: string
  name: string
  email: string
  profile: {
    avatar: string
  }
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

  public static singleWithProfile(
    user: (User & { profile: Profile | null }) | null,
  ): UserWithProfile {
    if (!user) return {} as UserWithProfile

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profile: { avatar: user.profile?.avatar || '' },
    }
  }

  public static login(user: User, token: string): LoginUserResponse {
    return {
      user: this.single(user),
      token,
    }
  }
}
