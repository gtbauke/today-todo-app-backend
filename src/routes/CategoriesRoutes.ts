import { Router } from 'express'

import { authMiddleware } from '../middlewares/auth'
import { CategoriesController } from '../controllers/CategoriesController'

const router = Router()
const controller = new CategoriesController()

router.post('/categories', authMiddleware, controller.store)

export const CategoriesRoutes = router
