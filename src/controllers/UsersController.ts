import { Request } from 'express'
import * as yup from 'yup'

import { DatabaseClient } from '../services/DatabaseClient'
import { usersValidator } from '../validators/UsersValidator'
import { PasswordEncryption } from '../services/PasswordEncryption'
import { UsersView, UserResponse } from '../views/UsersView'
import { Response } from './Response'

export class UsersController {
  public async store(
    req: Request,
    res: Response<UserResponse>,
  ): Promise<Response<UserResponse>> {
    try {
      const {
        name,
        email,
        password,
      } = await usersValidator.store.validate(req.body, { abortEarly: false })

      if (await DatabaseClient.client.user.findUnique({ where: { email } })) {
        return res.status(400).json({ message: 'This email is already in use' })
      }

      const hashedPassword = await PasswordEncryption.encrypt(password)
      const user = await DatabaseClient.client.user.create({
        data: { name, email, password: hashedPassword },
      })

      return res.status(201).json({ data: UsersView.single(user) })
    } catch (err) {
      const yupError = err as yup.ValidationError
      return res.status(400).json({ message: yupError.errors })
    }
  }
}
