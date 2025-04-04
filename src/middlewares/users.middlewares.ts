import {Request, Response, NextFunction} from 'express'

export const loginValidator = async (req:Request, res: Response, next: NextFunction): Promise<any> => {
  const { email, password } = req.body
  if(!email || !password) {
    res.status(400).json({
      error: 'missing email or password'
    })
  }
  next()
}
