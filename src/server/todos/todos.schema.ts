import mongoose from 'mongoose'
import { Todo } from './todos.model'

export const todoSchema = new mongoose.Schema<Todo>({
  description: { type: String, required: true },
  done: Boolean,
})

export const TodoModel = mongoose.model('Todo', todoSchema)
