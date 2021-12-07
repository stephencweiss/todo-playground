import { Request, Response, Router } from 'express'
import { fetchTodos, insertTodo, removeTodo, updateTodo } from './todos.service'
import { Todo } from './todos.model'
import { fetchTodoById } from '.'

export const todoRouter = Router()
todoRouter
  .route('/')
  .get(async (_req: Request, res: Response<Todo[]>) =>
    res.send(await fetchTodos()),
  )
  .post(async (req: Request<{}, {}, Todo>, res: Response<Todo>) => {
    const insertedTodo = (await insertTodo(req.body)) as unknown as Todo // TODO: figure out how to type the document more specifically -- mongoose might be the solution here
    return res.status(201).send(insertedTodo)
  })

todoRouter
  .route('/:id')
  .get(async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params
      const found = await fetchTodoById(id)
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
  .patch(async (req: Request<{ id: string }, {}, Todo>, res: Response) => {
    try {
      const { id } = req.params
      res.status(204).send(await updateTodo(id, req.body))
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
    } catch (e) {
      res.status(400)
      if (hasMessage(e)) {
        res.send(e.message)
      }
      res.send()
    }
  })

function hasMessage(arg: unknown): arg is { message: any } {
  return typeof arg === 'object' && arg !== null && 'message' in arg
}
