import dotenv from 'dotenv'

import { DatabaseClient } from './services/DatabaseClient'
import { PasswordEncryption } from './services/PasswordEncryption'
import { App } from './App'
import { UsersRoutes } from './routes/UsersRoutes'
import { JWTService } from './services/JWTService'
import { SessionsRoutes } from './routes/SessionsRoutes'
import { TasksRoutes } from './routes/TasksRoutes'

dotenv.config()

const app = new App()

app.registerServices([DatabaseClient, PasswordEncryption, JWTService])
app.registerRoutes([UsersRoutes, SessionsRoutes, TasksRoutes])

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
