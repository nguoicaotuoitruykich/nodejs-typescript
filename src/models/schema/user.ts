// models/User.ts
import { ObjectId } from 'mongodb'

export interface User {
  _id?: ObjectId
  username: string
  email: string
  password: string
  date_of_birth: Date | number | string
  access_token?: string
  refresh_token?: string
  createdAt?: Date
  updatedAt?: Date
}

export default User
