import { User } from '../users'

export type Todo = { description: string; done?: true; owner: User }
