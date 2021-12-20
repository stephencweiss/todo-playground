import { Router } from 'express'
import {
  fetchAllTodos,
  fetchTodoById,
  createOne,
  deleteTodo,
  updateTodo,
} from './todos.controller'

export const todoRouter = Router()
todoRouter.route('/').get(fetchAllTodos).post(createOne)
todoRouter.route('/:id').get(fetchTodoById).patch(updateTodo).delete(deleteTodo)
