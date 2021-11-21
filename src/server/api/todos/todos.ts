import { Request, Response } from 'express'
import { BaseTodo, db, insertTodo, Todo } from '../../db'

export const todoRouter = require('express').Router()
todoRouter
  .route('/')
  .get((req: Request, res: Response<Todo[]>) => res.send(db))
  .post((req: Request<{},{}, BaseTodo>, res: Response<Todo>) => {
    const insertedTodo = insertTodo(req.body)
    return res.status(201).send(insertedTodo)
  })
todoRouter
  .route('/:id')
  .get((req: Request, res: Response) => new Error('Not yet implemented'))
  .put((req: Request, res: Response) => new Error('Not yet implemented'))
  .patch((req: Request, res: Response) => new Error('Not yet implemented'))
  .delete((req: Request, res: Response) => new Error('Not yet implemented'))

