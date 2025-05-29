// import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import usersServices from '../services/users.services'
import { USERS_MESSAGES } from '../constants/users.const'
import databaseServices from '../services/database.services'
import User from '../models/schema/user'

export const loginValidator = validate(
  checkSchema({
    email: {
      notEmpty: true,
      isEmail: {
        errorMessage: 'Email cannot empty'
      },
      trim: true,
      custom: {
        options: async (email, { req }) => {
          const db = databaseServices.getDB()
          const user = await db.collection<User>('users').findOne({ email, password: req.body.password })
          if (!user) {
            throw new Error(USERS_MESSAGES.USER_NOT_FOUND)
          }
          req.user = user
          return true
        }
      }
    },
    password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 6,
          max: 100
        }
      }
    }
  })
)

export const registerValidator = validate(
  checkSchema({
    username: {
      isLength: {
        options: {
          min: 1,
          max: 100
        }
      },
      notEmpty: true,
      trim: true
    },
    email: {
      notEmpty: true,
      isEmail: true,
      trim: true,
      custom: {
        options: async (value) => {
          const isExitEmail = await usersServices.checkEmailExit(value)
          if (isExitEmail) {
            throw new Error('Email already Exit!')
          }
          return true
        }
      }
    },
    password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 6,
          max: 100
        }
      }
    },
    confirm_password: {
      notEmpty: true,
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage: 'bạn đã gặp lỗi'
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('xác nhận password chưa khớp')
          }
          return true
        }
      }
    },
    date_of_birth: {
      notEmpty: false,
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    }
  })
)
