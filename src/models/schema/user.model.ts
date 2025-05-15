import { Collection } from 'mongodb'
import User from './user'
import databaseServices from '../../services/database.services'

class UserModel {
  constructor(private collection: Collection<User> | null = null) {
    databaseServices.connect().then((db) => {
      this.collection = db.collection<User>('users')
    })
  }

  // async init() {
  //   const db = await databaseServices.connect();
  //   this.collection = db.collection<User>('users');
  // }

  async insertUser(user: Omit<User, '_id' | 'createdAt' | 'updatedAt'>) {
    if (!this.collection) {
      throw new Error('Database is not ready')
    }
    const result = await this.collection.insertOne({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return result.insertedId
  }
}

export const userModel = new UserModel()
