import mongoose from 'mongoose'
import { Todo } from './todos.model'

// TODO: Add the user object and relate to the User model (simplest would just be to store the _id, but might consider storing the entire model)
export const todoSchema = new mongoose.Schema<Todo>(
  {
    description: { type: String, required: true },
    done: Boolean,
  },
  { timestamps: true },
)

export const TodoModel = mongoose.model('Todo', todoSchema)
