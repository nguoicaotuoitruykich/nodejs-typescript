import User from './models/schema/user'

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}
