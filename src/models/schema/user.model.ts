import { Collection } from 'mongodb'
import User from './user'
import databaseServices from '../../services/database.services'

class UserModel {
  constructor(private collection: Collection<User> | null = null) {}

  async insertUser(user: Omit<User, '_id' | 'createdAt' | 'updatedAt'>) {
    this.collection = await this.getUserCollection()
    const result = await this.collection.insertOne({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return result.insertedId
  }

  async getUserCollection(): Promise<Collection<User>> {
    if (!this.collection) {
      const db = await databaseServices.connect()
      this.collection = db.collection<User>('users')
    }
    return this.collection
  }
}

export const userModel = new UserModel()
