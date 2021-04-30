import { Router } from 'express'

import { TasksController } from '../controllers/TasksController'
import { authMiddleware } from '../middlewares/auth'

const router = Router()
const controller = new TasksController()

router.post('/tasks', authMiddleware, controller.store)
router.get('/tasks', authMiddleware, controller.index)
router.put('/tasks/:id', authMiddleware, controller.put)
router.delete('/tasks/:id', authMiddleware, controller.delete)

export const TasksRoutes = router
