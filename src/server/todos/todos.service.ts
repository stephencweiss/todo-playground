import { Todo, BaseTodo } from './todos.model'
import { _db } from '../../db'
import { Filter, WithId, Document, FindOptions } from 'mongodb'

const todos = _db.collection('todo')
let db: Todo[] = []

export const fetchTodos = (
  query?: Filter<WithId<Document>>,
  options?: FindOptions<Document>,
): any | Todo[] => {
  const found = query ? todos.find(query, options) : todos.find()
  // TODO: Consider converting to a stream
  return found.toArray()
}

// TODO: Look at return type of this function and make sure it's appropriate, see if we can narrow it a bit.
export const insertTodo = async (todo: BaseTodo) => {
  const id = db.length + 1
  const now = new Date().toISOString()
  const fullTodo = { ...todo, id, created: now, modified: now }
  return await todos.insertOne({ fullTodo })}

export const updateTodo = (id: string, updates: Partial<Todo>) => {
  const found = db.find((todo) => todo.id === Number(id))
  const now = new Date().toISOString()
  if (!found) throw new Error(`No TODO with id ${id}`)
  db = db.map((todo) => {
    if (todo.id === Number(id)) {
      todo = { ...todo, ...updates, modified: now }
    }
    return todo
  })
}

export const removeTodo = (id: string) => {
  const found = db.find((todo) => todo.id === Number(id))
  if (!found) throw new Error(`No TODO with id ${id}`)
  db = db.filter((todo) => todo.id !== Number(id))
}
