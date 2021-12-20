import mongoose from 'mongoose'
import { Todo } from './todos.model'

export const todoSchema = new mongoose.Schema<Todo>(
  {
    name: { type: String, required: true },
    done: Boolean,
    notes: String,
    due: Date,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Active', 'Past Due', 'Completed'],
      default: 'Active',
    },
    // Associate a todo with a list
    // list: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: 'List',
    //   required: true,
    // },
  },
  { timestamps: true },
)

export const TodoModel = mongoose.model('Todo', todoSchema)
