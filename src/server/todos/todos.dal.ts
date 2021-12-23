import { TodoModel } from './todos.schema'
import { genericDal } from '../../utils/dalController'

export const todoDal = genericDal(TodoModel)
