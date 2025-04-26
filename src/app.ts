import userRouter from './routes/users.routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
const app = express()
const port = 3001
app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use('/user', userRouter)

import mongoose from 'mongoose'

mongoose
  .connect('mongodb://127.0.0.1:27017/mydatabase')
  .then(() => {
    console.log('Kết nối MongoDB thành công!')
  })
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error('Lỗi kết nối MongoDB:', err.message)
    } else {
      console.error('Lỗi không xác định:', err)
    }
  })

app.listen(port, () => {
  console.log(`\x1b[32m------------------------Server running port ${port}------------------------\x1b[0m`)
})
