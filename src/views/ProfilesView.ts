import { Profile } from '.prisma/client'

export interface ProfileResponse {
  id: string
  avatar: string
  userId: string
}

export class ProfilesView {
  public static single(profile: Profile): ProfileResponse {
    return {
      id: profile.id,
      avatar: profile.avatar || '',
      userId: profile.userId,
    }
  }

  public static many(profiles: Profile[]): ProfileResponse[] {
    return profiles.map(this.single)
  }
}
