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

  public async view(
    req: Request,
    res: Response<UserResponse>,
  ): Promise<Response<UserResponse>> {
    const { id } = req.params as { id: string }
    const user = await DatabaseClient.client.user.findUnique({
      where: { id },
    })

    if (!user) {
      return res
        .status(400)
        .json({ message: 'There are no users with the provided id' })
    }

    return res.status(200).json({ data: UsersView.single(user) })
  }

  public async me(
    req: Request,
    res: Response<UserResponse>,
  ): Promise<Response<UserResponse>> {
    const user = await DatabaseClient.client.user.findUnique({
      where: { id: res.locals.currentUserId },
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json({ data: UsersView.single(user) })
  }
}
