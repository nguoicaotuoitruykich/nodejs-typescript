import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import usersServices from '../services/users.services'
import { userModel } from '../models/schema/user.model'
import { ObjectId } from 'mongodb'

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const user = req.user
  const userId = user._id?.toString()
  if (!userId) {
    throw new Error('userId is null')
  }
  const [access_token, refresh_token] = await usersServices.setRefreshTokenAndAccessToken(userId)
  console.log({ access_token, refresh_token })
  res.status(200).json({
    message: 'login success',
    result: { access_token, refresh_token }
  })
}
export const registerController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.mapped() })
    next()
  }

  try {
    const { username, password, email, date_of_birth = Date.now() } = req.body
    const newUserId = new ObjectId().toString()
    const [access_token, refresh_token] = await usersServices.setRefreshTokenAndAccessToken(newUserId)
    const newUser = await userModel.insertUser({
      username,
      password,
      email,
      date_of_birth,
      access_token,
      refresh_token
    })

    res.send({
      message: `tạo mới tài khoản ${username} thành công`,
      result: {
        id: newUser,
        access_token,
        refresh_token
      }
    })
  } catch (error) {
    res.status(500).send({
      message: error
    })
  }
}
