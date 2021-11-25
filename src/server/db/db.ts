export type BaseTodo = { description: string; done?: true }

export type Todo = BaseTodo & {
  id: number
  created: string // utc timestamp
  modified: string // utc timestamp
}

export let db: Todo[] = []

export const insertTodo = (todo: BaseTodo): Todo => {
  const id = db.length + 1
  const now = new Date().toISOString()
  const fullTodo = { ...todo, id, created: now, modified: now }
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


export const _resetDb = () => {
  db = []
}