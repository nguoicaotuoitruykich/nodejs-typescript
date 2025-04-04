import { Request, Response, NextFunction } from 'express'
import { checkSchema, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import { validate } from '../utils/validation'

export const loginValidator = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({
      error: 'missing email or password'
    })
  }
  next()
}

export const registerValidator = validate(checkSchema({
  name: {
    isLength: {
      options: {
        min: 1,
        max: 100
      }
    },
    notEmpty: true,
    trim: true,
  },
  email: {
    notEmpty: true,
    isEmail: true,
    trim: true,
    custom: {
      options: (value) => {
        console.log(value)
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
    },
    
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
      options: (value, {req}) => {
        if(value !== req.body.password) {
          throw new Error('xác nhận password chưa khớp')
        }
        return true
      }
    }
  },
  date_of_birth: {
    isISO8601: {
      options: {
        strict: true,
        strictSeparator: true
      }
    }
  }
}))

