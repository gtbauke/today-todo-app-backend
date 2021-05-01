import { Request } from 'express'

import { Response } from './Response'
import { ProfileResponse, ProfilesView } from '../views/ProfilesView'
import { DatabaseClient } from '../services/DatabaseClient'

export class ProfilesController {
  // TODO: change how the file path is created
  public async update(
    req: Request,
    res: Response<ProfileResponse>,
  ): Promise<Response<ProfileResponse>> {
    try {
      const { id } = req.params as { id: string }
      const profile = await DatabaseClient.client.profile.update({
        where: { userId: id },
        data: { avatar: `http://localhost:3000/uploads/${req.file.filename}` },
      })

      return res.status(200).json({ data: ProfilesView.single(profile) })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
