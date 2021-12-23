import { TodoModel } from './todos.schema'
import { genericDal } from '../../utils'

export const todoDal = genericDal(TodoModel)
