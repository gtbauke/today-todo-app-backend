import { Router } from 'express'

import { TasksController } from '../controllers/TasksController'
import { authMiddleware } from '../middlewares/auth'

const router = Router()
const controller = new TasksController()

router.post('/tasks', authMiddleware, controller.store)
router.get('/tasks', authMiddleware, controller.index)

export const TasksRoutes = router
