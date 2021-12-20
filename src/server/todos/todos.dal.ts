import { FilterQuery } from 'mongoose'
import { Todo } from '.'
import { TodoModel } from './todos.schema'

export const saveTodo = async (todo: Todo) => {
  return await TodoModel.create(todo)
}

export const findTodoById = async (id: string) => {
  return await TodoModel.findById(id).exec()
}

export const findTodo = async (query?: FilterQuery<Todo>) => {
  return await (query ? TodoModel.find(query).exec() : TodoModel.find().exec())
}

export const updateTodo = async (id: string, update: Partial<Todo>) => {
  // Is it normal to do this check, which means every update has 2 queries - or should you just allow findByIdAndUpdate to do its thing?
  if (await TodoModel.findById(id)) {
    return await TodoModel.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true },
    ).exec()
  } else {
    throw new Error(`No TODO with id ${id}`)
  }
}

export const removeTodo = async (id: string) => {
  return await TodoModel.findByIdAndDelete(id)
}
