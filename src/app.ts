import userRouter from './routes/users.routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import databaseServices from './services/database.services'
const app = express()
const port = 3001
app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
databaseServices.connect()

app.listen(port, () => {
  console.log(`\x1b[32m------------------------Server running port ${port}------------------------\x1b[0m`)
})
