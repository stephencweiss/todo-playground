import express from 'express'
import cors, { CorsOptions } from 'cors'
import bp from 'body-parser'
import morgan from 'morgan'
import { config } from '../config'
import { todoRouter } from './todos'
import { dbConnect } from '../db'
import { authRouter } from './auth'
import { userRouter } from './users'
import { protect } from './middleware/protect'

dbConnect()

const allowList = ['http://mydomain.com', 'http://myotherdomain.com']
const corsOptions: CorsOptions = {
  // origin fn adapted from: https://www.npmjs.com/package/cors#configuring-cors-w-dynamic-origin
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, origin?: boolean) => void,
  ) {
    // Allow requests from allowed origins / server-to-server requests (no-origin)
    if (!origin || allowList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

export const app = express()

const apiRouter = express.Router()
/** General Middleware */
app.use(cors(corsOptions))
app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())
app.use(morgan(config.logs?.level ?? 'common'))

/** Routes */
app.use(config.api?.prefix ?? '/api', apiRouter)
apiRouter.use('/auth', authRouter)

/** Protected routes */
apiRouter.use(protect)
apiRouter.use('/todo', todoRouter)
apiRouter.use('/', userRouter)

app.get('*', (_req: any, res: any) => res.status(404).send())
