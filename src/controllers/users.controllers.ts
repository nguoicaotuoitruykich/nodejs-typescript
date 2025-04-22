import { error } from 'console'
import {Request, Response, NextFunction} from 'express'
import { validationResult } from 'express-validator'

export const  loginController  = async  (req: Request, res: Response):Promise<void> => {
  const { email, password } = req.body
  if(email === 'daototung@gmail.com' && password === '123456') {
     res.json({
      message: 'login success'
    })
    return
    
  }
    res.status(400).json({
    error: 'Login Fail'
  })
}
export const  registerController  = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
     res.status(400).json({ errors: errors.mapped() })
     return
  }
  res.send({
    message: errors
  })
}