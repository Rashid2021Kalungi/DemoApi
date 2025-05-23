import {Router} from 'express'
import {userController} from '../controllers/user.controller.js'

const userRouter=Router()

userRouter.post("/signup",userController)

export default userRouter