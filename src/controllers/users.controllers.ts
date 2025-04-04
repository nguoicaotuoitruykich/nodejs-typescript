import { error } from 'console'
import {Request, Response} from 'express'

export const  loginController  = async  (req: Request, res: Response):Promise<void> => {
  console.log(req.body)
  const { email, password } = req.body
  if(email === 'daototung@gmail.com' && password === '123456') {
     res.json({
      message: 'login success'
    })
    
  }
    res.status(400).json({
    error: 'Login Fail'
  })
}