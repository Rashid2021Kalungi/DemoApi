import {Router} from 'express'
import {loginController, logoutController, userController} from '../controllers/user.controller.js'
import auth from '../middleware/auth.js';

const userRouter=Router()

userRouter.post("/signup",userController)
userRouter.post("/login", loginController);
userRouter.get("/logout", auth,logoutController);

export default userRouter