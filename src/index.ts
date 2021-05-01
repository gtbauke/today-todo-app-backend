import dotenv from 'dotenv'

import { DatabaseClient } from './services/DatabaseClient'
import { PasswordEncryption } from './services/PasswordEncryption'
import { App } from './App'
import { UsersRoutes } from './routes/UsersRoutes'
import { JWTService } from './services/JWTService'
import { SessionsRoutes } from './routes/SessionsRoutes'
import { TasksRoutes } from './routes/TasksRoutes'
import { ProfilesRoutes } from './routes/ProfileRoutes'
import { CategoriesRoutes } from './routes/CategoriesRoutes'

dotenv.config()

const app = new App()

app.registerServices([DatabaseClient, PasswordEncryption, JWTService])
app.registerRoutes([
  UsersRoutes,
  SessionsRoutes,
  TasksRoutes,
  ProfilesRoutes,
  CategoriesRoutes,
])

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
