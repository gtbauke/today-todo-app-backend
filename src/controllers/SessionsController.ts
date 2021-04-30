import { Request } from 'express'
import * as yup from 'yup'

import { usersValidator } from '../validators/UsersValidator'
import { JWTService } from '../services/JWTService'
import { DatabaseClient } from '../services/DatabaseClient'
import { LoginUserResponse, UsersView } from '../views/UsersView'
import { Response } from './Response'
import { PasswordEncryption } from '../services/PasswordEncryption'

export class SessionsController {
  public async login(
    req: Request,
    res: Response<LoginUserResponse>,
  ): Promise<Response<LoginUserResponse>> {
    try {
      const { email, password } = await usersValidator.login.validate(
        req.body,
        { abortEarly: false },
      )

      const user = await DatabaseClient.client.user.findUnique({
        where: { email },
      })

      if (!user) {
        return res
          .status(400)
          .json({ message: 'A user with this email address does not exists' })
      }

      const isSamePassword = await PasswordEncryption.check(
        password,
        user.password,
      )

      if (!isSamePassword) {
        return res.status(400).json({ message: 'Invalid password' })
      }

      const jwt = await JWTService.sign(user.id)
      return res.status(200).json({ data: UsersView.login(user, jwt) })
    } catch (err) {
      const yupError = err as yup.ValidationError
      return res.status(400).json({ message: yupError.errors })
    }
  }
}
