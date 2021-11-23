import { Request, Response } from 'express'
import { BaseTodo, db, insertTodo, Todo } from '../../db'

export const todoRouter = require('express').Router()
todoRouter
  .route('/')
  .get((req: Request, res: Response<Todo[]>) => res.send(db))
  .post((req: Request<{}, {}, BaseTodo>, res: Response<Todo>) => {
    const insertedTodo = insertTodo(req.body)
    return res.status(201).send(insertedTodo)
  })

todoRouter
  .route('/:id')
  .get((req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params
      const found = db.find((todo) => todo.id === Number(id))
      if (!found) throw new Error(`No TODO with id ${id}`)
      res.send(found)
    } catch (e: unknown) {
      if (hasMessage(e)) {
        res.status(404).send({ error: e.message })
      }
      res.status(404)
    }
  })
  .put((req: Request, res: Response) => new Error('Not yet implemented'))
  .patch((req: Request, res: Response) => new Error('Not yet implemented'))
  .delete((req: Request, res: Response) => new Error('Not yet implemented'))

function hasMessage(arg: unknown): arg is { message: any } {
  return typeof arg === 'object' && arg !== null && 'message' in arg
}
