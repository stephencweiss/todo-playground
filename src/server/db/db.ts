export type BaseTodo = { description: string; done?: true }

export type Todo = BaseTodo & {
  id: number
  created: string // utc timestamp
  modified: string // utc timestamp
}

export const insertTodo = (todo: BaseTodo): Todo => {
  const id = db.length + 1
  const now = new Date().toISOString()
  const fullTodo = { ...todo, id, created: now, modified: now }
  db.push(fullTodo)
  return fullTodo
}

export const db: Todo[] = []
