import { db } from '../../db'

export const todoRouter = require('express').Router()
todoRouter.route('/').get((req: any, res: any) => res.send(db))
todoRouter
  .route('/:id')
  .get((req: any, res: any) => new Error('Not yet implemented'))
  .post((req: any, res: any) => new Error('Not yet implemented'))
  .put((req: any, res: any) => new Error('Not yet implemented'))
  .patch((req: any, res: any) => new Error('Not yet implemented'))
  .delete((req: any, res: any) => new Error('Not yet implemented'))
