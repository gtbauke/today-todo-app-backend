import { Router } from 'express'

import { authMiddleware } from '../middlewares/auth'
import { CategoriesController } from '../controllers/CategoriesController'

const router = Router()
const controller = new CategoriesController()

router.post('/categories', authMiddleware, controller.store)
router.delete('/categories/:id', authMiddleware, controller.delete)

export const CategoriesRoutes = router
