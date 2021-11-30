import express from 'express';
import bp from 'body-parser';
import morgan from 'morgan';

import { apiRouter } from '@/api'

export const app = express()

/** General Middleware */
app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())
app.use(morgan('dev'))

/** Routes */
app.use('/api', apiRouter)

app.get('*', (_req: any, res: any) => res.status(404).send())
