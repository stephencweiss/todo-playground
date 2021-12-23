import { Request, Response } from 'express'
import { hasMessage } from '../../utils'
import {
  fetchTodoById as getTodoById,
  fetchTodos,
  insertTodo,
  removeTodo,
  updateTodo as updtTodo,
} from './todos.service'
import { Todo } from './todos.domain'
import { User } from '../users/users.model'

export const createOne = async (
  req: Request<{}, {}, Todo>,
  res: Response<{ data: Todo }>,
) => {
  const createdBy = req.user ?? ({} as User)
  try {
    // TODO: make sure to strip out properties of req.body that are not part of the model
    const insertedTodo = await insertTodo({ ...req.body, createdBy })
    return res.status(201).json({ data: insertedTodo })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const fetchAllTodos = async (_req: Request, res: Response<Todo[]>) =>
  res.send(await fetchTodos())

export const fetchTodoById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params
    const found = await getTodoById(id)
    if (!found) throw new Error(`No TODO with id ${id}`)
    res.send(found)
  } catch (e: unknown) {
    if (hasMessage(e)) {
      res.status(404).send({ error: e.message })
    } else {
      res.status(404).send()
    }
  }
}

export const updateTodo = async (
  req: Request<{ id: string }, {}, Todo>,
  res: Response,
) => {
  try {
    const { id } = req.params
    res.status(204).send(await updtTodo(id, req.body))
  } catch (e) {
    res.status(400)
    if (hasMessage(e)) {
      res.send({ error: e.message })
    } else {
      res.send()
    }
  }
}

export const deleteTodo = (req: Request, res: Response) => {
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
}
