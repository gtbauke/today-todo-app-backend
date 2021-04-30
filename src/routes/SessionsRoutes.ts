import { Router } from 'express'

import { SessionsController } from '../controllers/SessionsController'

const router = Router()
const sessionsController = new SessionsController()

router.post('/users/auth', sessionsController.login)

export const SessionsRoutes = router
