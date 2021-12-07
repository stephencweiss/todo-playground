import { Todo, BaseTodo } from './todos.model'
import { _db } from '../../db'
import { Filter, WithId, Document, FindOptions, ObjectId } from 'mongodb'

const todos = _db.collection('todo')

export const fetchTodos = async (
  query?: Filter<WithId<Document>>,
  options?: FindOptions<Document>,
): Promise<any | Todo[]> => {
  const found = query ? todos.find(query, options) : todos.find()
  const foundResults = await found.toArray()
  // TODO: Consider converting to a stream
  return foundResults
}

// TODO: Look at return type of this function and make sure it's appropriate, see if we can narrow it a bit.
export const insertTodo = async (todo: BaseTodo) => {
  return await todos.insertOne(todo)
}

export const updateTodo = async (id: string, updates: Partial<Todo>) => {
  // The question is: is it worth doing this find at all? or can we just rely on the db?
  const found = await fetchTodos({ _id: new ObjectId(id) })
  if (!found) throw new Error(`No TODO with id ${id}`)
  return await todos.updateOne({ _id: new ObjectId(id) }, { $set: updates })
}

export const removeTodo = async (id: string) => {
  return await todos.deleteOne({ _id: new ObjectId(id) })
}
