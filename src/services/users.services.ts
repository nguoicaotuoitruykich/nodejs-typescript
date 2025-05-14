import { signToken } from '../utils/jwt'
import { TokenType } from '../constants/users.const'
import databaseServices from './database.services'

class UsersServices {
  signAccessToken = async (userId: string): Promise<string> => {
    return await signToken({
      payload: {
        userId,
        tokenType: TokenType.AccessToken
      },
      options: {
        expiresIn: '1h'
      }
    })
  }

  signRefreshToken = async (userId: string): Promise<string> => {
    return await signToken({
      payload: {
        userId,
        tokenType: TokenType.RefreshToken
      },
      options: {
        expiresIn: '1d'
      }
    })
  }

  async checkEmailExit(email: string) {
    const db = await databaseServices.connect()
    const dataUser = await db.collection('users').findOne({ email })
    return dataUser
  }
}

const usersServices = new UsersServices()
export default usersServices
