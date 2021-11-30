import { Router } from 'express'
import { todoRouter } from './todos'

export const apiRouter = Router()
apiRouter.use('/todos', todoRouter)
