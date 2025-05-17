// models/User.ts
import { ObjectId } from 'mongodb'

enum UserVerifyStatus {
  Unverified,
  Verified,
  Banned
}

export interface UserType {
  _id?: ObjectId
  username: string
  email: string
  password: string
  date_of_birth?: Date | number | string
  access_token?: string
  refresh_token?: string
  createdAt?: Date
  updatedAt?: Date
  verify?: UserVerifyStatus
}

export default class User {
  _id?: ObjectId
  username: string
  email: string
  password: string
  date_of_birth: Date | number | string
  access_token?: string
  refresh_token?: string
  createdAt?: Date
  updatedAt?: Date
  verify?: UserVerifyStatus

  constructor(user: UserType) {
    this._id = user._id
    this.username = user.username || ''
    this.email = user.email
    this.password = user.password
    this.date_of_birth = user.date_of_birth || new Date()
    this.access_token = user.access_token
    this.refresh_token = user.refresh_token
    this.createdAt = user.createdAt || new Date()
    this.updatedAt = user.updatedAt || new Date()
    this.verify = user.verify || UserVerifyStatus.Unverified
  }
}
