import jwt, { PrivateKey, Secret, SignOptions } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const secretKey = process.env.JWT_SECRET
if (!secretKey) {
  throw new Error('Missing JWT_SECRET in environment variables')
}

export const signToken = ({
  payload,
  privateKey = secretKey,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  privateKey?: Secret | PrivateKey | string
  options?: SignOptions
}) => {
  // const options: jwt.SignOptions = { expiresIn: '1h' };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) {
        throw reject(error)
      }
      resolve(token as string)
    })
  })
}
