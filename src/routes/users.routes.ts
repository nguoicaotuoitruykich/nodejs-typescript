import  {Router} from 'express'
import { loginValidator } from '../middlewares/users.middlewares';
import { loginController } from '../controllers/users.controllers';
const userRouter = Router();


userRouter.post('/login', loginValidator, loginController)

export default userRouter