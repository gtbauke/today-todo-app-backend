/* eslint-disable consistent-return */
import { Request, NextFunction } from 'express'

import { Response } from '../controllers/Response'

export const checkUserParamsMiddleware = async (
  req: Request,
  res: Response<string>,
  next: NextFunction,
): Promise<void | Response<string>> => {
  const { id } = req.params as { id: string }

  if (id !== res.locals.currentUserId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  next()
}
