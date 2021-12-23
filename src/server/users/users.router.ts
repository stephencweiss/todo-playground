import { Router } from 'express'

export const userRouter = Router()

// TODO split the /signup and /signing into an `authRouter` and spearate from the userrouter
userRouter
  .route('/:id')
  .get((req, res) => new Error('Not yet implemented'))
  .delete((req, res) => new Error('Not yet implemented'))
  .patch((req, res) => new Error('Not yet implemented'))
