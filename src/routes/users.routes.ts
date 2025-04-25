import  {Router} from 'express'
import { loginValidator, registerValidator } from '../middlewares/users.middlewares';
import { loginController, registerController } from '../controllers/users.controllers';
const userRouter = Router();


userRouter.post('/login', loginValidator, loginController)

userRouter.post('/register', registerValidator, registerController)

export default userRouter