
import mongoose from 'mongoose';
import User from '../models/schema/user.model';



class UsersServices {
  // async register(payload: {email: string, password: string}) {
  //   const {email, password} = payload
  //   const result = await databaseServices.users.insertOne(
  //     new User({
  //       email,
  //       password
  //     })
  //   )
  // }

  async checkEmailExit(email: string) {
   const user = await User.findOne({email})
   return user
  }

    
}

 const usersServices = new UsersServices()
 export default usersServices

