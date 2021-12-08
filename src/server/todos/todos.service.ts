import { Todo } from './todos.model'
import * as dal from './todos.dal'
import { FilterQuery } from 'mongoose'

export const fetchTodos = async (
  query?: FilterQuery<Todo>,
): Promise<any | Todo[]> => {
  return await dal.findTodo(query)
}

export const fetchTodoById = async (id: string): Promise<Todo | null> => {
  return await dal.findTodoById(id)
}

export const insertTodo = async (todo: Todo): Promise<Todo> => {
  return await dal.saveTodo(todo)
}

export const updateTodo = async (id: string, updates: Partial<Todo>) => {
  return await dal.updateTodo(id, updates)
}

export const removeTodo = async (id: string) => {
  return await dal.removeTodo(id)
}
