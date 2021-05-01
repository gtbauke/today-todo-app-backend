import { Router } from 'express'
import multer from 'multer'

import { ProfilesController } from '../controllers/ProfilesController'
import { authMiddleware } from '../middlewares/auth'
import { checkUserParamsMiddleware } from '../middlewares/check'
import { multerOptions } from '../config/multer'

const multerInstance = multer(multerOptions)

const router = Router()
const controller = new ProfilesController()

router.put(
  '/users/:id/profile',
  authMiddleware,
  checkUserParamsMiddleware,
  multerInstance.single('avatar'),
  controller.update,
)

export const ProfilesRoutes = router
