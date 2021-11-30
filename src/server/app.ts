import express from 'express'
import bp from 'body-parser'
import morgan from 'morgan'
import { todoRouter } from './todos'

export const app = express()

const apiRouter = express.Router()
/** General Middleware */
app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())
app.use(morgan('dev'))

/** Routes */
app.use('/api', apiRouter)
apiRouter.use('/todo', todoRouter)

app.get('*', (_req: any, res: any) => res.status(404).send())
