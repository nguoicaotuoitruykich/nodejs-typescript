import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import User from '../models/schema/user.model'
import { signToken } from '../utils/jwt'
import { TokenType } from '../constants/users.const'

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  if (email === 'daototung@gmail.com' && password === '123456') {
    res.json({
      message: 'login success'
    })
    return
  }
  res.status(400).json({
    error: 'Login Fail'
  })
}
export const registerController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.mapped() })
    next()
  }

  const signAccessToken = async (userId: string) => {
    return await signToken({
      payload: {
        userId,
        tokenType: TokenType.AccessToken
      },
      options: {
        expiresIn: '1h'
      }
    })
  }

  const signRefreshToken = async (userId: string) => {
    return await signToken({
      payload: {
        userId,
        tokenType: TokenType.RefreshToken
      },
      options: {
        expiresIn: '1d'
      }
    })
  }

  try {
    const { username, password, email, date_of_birth = Date.now() } = req.body
    const newUser = new User({
      username,
      password,
      email,
      date_of_birth
    })
    const resultUser = await newUser.save()
    const userId = resultUser._id.toString()
    const [accessToken, refreshToken] = await Promise.all([signAccessToken(userId), signRefreshToken(userId)])

    res.send({
      message: `tạo mới tài khoản ${username} thành công`,
      result: {
        insertedID: resultUser._id,
        accessToken,
        refreshToken
      }
    })
  } catch (error) {
    res.send({
      message: error
    })
  }
}
