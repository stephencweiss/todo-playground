import { Request, Response } from 'express'
import { BaseTodo, db, insertTodo, removeTodo, Todo, updateTodo } from '../../db'

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
      } else {
        res.status(404).send()
      }
    }
  })
  .put(
    (req: Request<{}, {}, Partial<Todo>>, res: Response) =>
      new Error('Not yet implemented'),
  )
  .patch((req: Request, res: Response) => {
    try {
      const { id } = req.params
      updateTodo(id, req.body)
      res.status(204).send()
    } catch (e) {
      res.status(400)
      if (hasMessage(e)) {
        res.send({ error: e.message })
      } else {
        res.send()
      }
    }
  })
  .delete((req: Request, res: Response) => {
    try {
      const { id } = req.params
      removeTodo(id)
      res.status(204).send()
    } catch(e){
      res.status(400)
      if(hasMessage(e)){
        res.send(e.message)
      }
      res.send()
    }
  })

function hasMessage(arg: unknown): arg is { message: any } {
  return typeof arg === 'object' && arg !== null && 'message' in arg
}
