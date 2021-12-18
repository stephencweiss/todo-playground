import { Router } from 'express'
import {
  fetchAllTodos,
  fetchTodoById,
  addTodo,
  deleteTodo,
  updateTodo,
} from './todos.controller'

export const todoRouter = Router()
todoRouter.route('/').get(fetchAllTodos).post(addTodo)
todoRouter.route('/:id').get(fetchTodoById).patch(updateTodo).delete(deleteTodo)
