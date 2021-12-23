import { Router } from 'express'
import { signup, signin } from './auth.controller'

export const authRouter = Router()
authRouter.route('/signup').post(signup)
authRouter.route('/signin').post(signin)
