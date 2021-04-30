/* eslint-disable consistent-return */
import { NextFunction, Request } from 'express'

import { Response } from '../controllers/Response'
import { JWTService } from '../services/JWTService'

export const authMiddleware = async (
  req: Request,
  res: Response<string>,
  next: NextFunction,
): Promise<void | Response<string>> => {
  const tokenString = req.headers.authorization
  if (!tokenString) {
    return res
      .status(401)
      .json({ message: 'Unauthorized! No access token was provided' })
  }

  try {
    const token = tokenString.split(' ')[1]
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized! No access token was provided' })
    }

    const decoded = await JWTService.decode(token)
    res.locals.currentUserId = decoded
    next()
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
