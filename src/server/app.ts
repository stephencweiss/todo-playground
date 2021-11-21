const express = require('express')
const { apiRouter } = require('./api')
export const app = express()

app.use('/api', apiRouter)

app.get('*', (_req: any, res: any) => res.status(404).send())
