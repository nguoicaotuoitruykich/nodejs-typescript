import { MongoClient } from 'mongodb'

const uri = 'mongodb://127.0.0.1:27017/'

class DatabaseServices {
  private client: MongoClient
  constructor() {
    this.client = new MongoClient(uri)
  }
  async connect() {
    try {
      await this.client.db('admin').command({ ping: 1 })
      console.log('ping your deployment . you successfully connected to Mongodb!')
    } finally {
      await this.client.close()
    }
  }
}

const databaseServices = new DatabaseServices() // tạo object từ class
export default databaseServices
