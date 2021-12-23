import { CreateTodoInput, Todo } from './todos.domain'
import { todoDal } from './todos.dal'
import { FilterQuery } from 'mongoose'
import { User } from '../users'

export const fetchTodos = async (
  query?: FilterQuery<Todo>,
): Promise<any | Todo[]> => await todoDal.find(query)

export const fetchTodoById = async (id: string): Promise<Todo | null> =>
  await todoDal.findById(id)

export const insertTodo = async (
  todo: CreateTodoInput & { createdBy?: User },
): Promise<Todo> => await todoDal.save(todo)

export const updateTodo = async (id: string, updates: Partial<Todo>) =>
  await todoDal.update(id, updates)

export const removeTodo = async (id: string) => await todoDal.deleteById(id)
