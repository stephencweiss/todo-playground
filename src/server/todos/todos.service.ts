import { Todo, BaseTodo } from './todos.model'

export let db: Todo[] = []

export const _resetDb = () => {
  db = []
}

export const fetchTodos = (predicate?: (arg: Todo) => boolean): Todo[] => {
  return predicate ? db.filter(predicate) : db
}

export const insertTodo = (todo: BaseTodo): Todo => {
  const id = db.length + 1
  const now = new Date().toISOString()
  const fullTodo = { ...todo, id, created: now, modified: now }
  // db.insertOne({ fullTodo })
  db.push(fullTodo)
  return fullTodo
}

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
