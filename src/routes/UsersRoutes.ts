import { Router } from 'express'

import { UsersController } from '../controllers/UsersController'
import { authMiddleware } from '../middlewares/auth'
import { checkUserParamsMiddleware } from '../middlewares/check'

const router = Router()
const controller = new UsersController()

router.post('/users', controller.store)
router.get('/users/me', authMiddleware, controller.me)
router.get('/users/:id', authMiddleware, controller.view)

export const UsersRoutes = router
