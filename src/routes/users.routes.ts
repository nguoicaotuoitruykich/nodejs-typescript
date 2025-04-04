import  {Router} from 'express'
import { loginValidator, registerValidator } from '../middlewares/users.middlewares';
import { loginController, registerController } from '../controllers/users.controllers';
import { validate } from '../utils/validation';
const userRouter = Router();


userRouter.post('/login', loginValidator, loginController)

userRouter.post('/register', registerValidator, registerController)

export default userRouter