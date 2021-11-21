import { todoRouter } from './todos'

export const apiRouter = require('express').Router()
apiRouter.use('/todos', todoRouter)
