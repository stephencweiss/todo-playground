import { User } from '../users'

type Status = 'Active' | 'Past Due' | 'Completed'

export type CreateTodoInput = {
  name: string
  done?: true
  due: Date
  status?: Status
  notes?: string
}

export type Todo = {
  name: string
  done?: true
  due: Date
  status?: Status
  notes?: string
  createdBy?: User
  // list: List
}
