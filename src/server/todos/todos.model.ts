export type BaseTodo = { description: string; done?: true }

export type Todo = BaseTodo & {
  id: number
  created: string // utc timestamp
  modified: string // utc timestamp
}
