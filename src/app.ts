import userRouter from './routes/users.routes'
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { query, validationResult, matchedData } = require('express-validator')
const express = require('express')
const app = express()
const port = 3001
app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use('/user', userRouter)

app.listen(port, () => {
  console.log(`\x1b[32m------------------------Server running port ${port}------------------------\x1b[0m`)
})

// app.get('/hello', 
// query('person')
// .notEmpty()
// .withMessage('khong dc de trong')
// .escape(), (req, res) => {
//   const err = validationResult(req)
//   if (err.isEmpty()) {
//     const data = matchedData(req)
//     return res.send(`Hello, ${req.query.person}!`)
//   }
//   return res.status(400).json({ errors: err.array() })
// })

// app.get('/set-cookie', (req, res) => {
//   res.cookie('username', 'tung ok', { maxAge: 3600 * 1000 })
//   res.send('Cookie da duoc tao thanh cong')
// })

// app.get('/get-cookie', (req, res) => {
//   const username = req.cookies.username
//   res.send(`thong tin username la ${username}`)
// })

