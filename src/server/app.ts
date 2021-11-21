const express = require('express')
const { urlencoded, json } = require('body-parser')
const morgan = require('morgan')

const { apiRouter } = require('./api')

export const app = express()

/** General Middleware */
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(morgan('dev'))

/** Routes */
app.use('/api', apiRouter)

app.get('*', (_req: any, res: any) => res.status(404).send())
