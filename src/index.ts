import dotenv from 'dotenv'

import { DatabaseClient } from './services/DatabaseClient'
import { PasswordEncryption } from './services/PasswordEncryption'
import { App } from './App'
import { UsersRoutes } from './routes/UsersRoutes'

dotenv.config()

const app = new App()

app.registerServices([DatabaseClient, PasswordEncryption])
app.registerRoutes([UsersRoutes])

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
