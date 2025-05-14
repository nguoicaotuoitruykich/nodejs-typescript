import { Db, MongoClient } from 'mongodb'

const uri = 'mongodb://127.0.0.1:27017/'

class DatabaseServices {
  private client: MongoClient
  public db: Db | null = null
  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI as string)
  }
  async connect(): Promise<Db> {
    if (!this.db) {
      await this.client.connect()
      this.db = this.client.db('mydatabase')
      console.log('✅ MongoDB connected')
    }
    return this.db
  }

  getDB(): Db {
    if (!this.db) throw new Error('Database not connected.')
    return this.db
  }
}

const databaseServices = new DatabaseServices() // tạo object từ class
export default databaseServices
