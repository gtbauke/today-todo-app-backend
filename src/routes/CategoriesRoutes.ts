import { Router } from 'express'

import { authMiddleware } from '../middlewares/auth'
import { CategoriesController } from '../controllers/CategoriesController'

const router = Router()
const controller = new CategoriesController()

router.get('/categories', authMiddleware, controller.index)
router.get('/categories/:id', authMiddleware, controller.view)

router.post('/categories', authMiddleware, controller.store)
router.delete('/categories/:id', authMiddleware, controller.delete)

export const CategoriesRoutes = router
