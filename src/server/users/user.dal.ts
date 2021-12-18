import { Document, FilterQuery } from 'mongoose'
import { User, UserDTO } from '.'
import { UserModel } from './users.schema'

export const saveUser = async (user: UserDTO) => {
  // TODO: there has to be a better way to handle this
  /**
   * Goals:
   * 1. don't store passwords in plain text
   * 2. have a method on the user model to automatically handle hashing
   * 3. have a salt for each method
   * the way the model currently works with the `.pre` method is a mix of this: https://github.com/FrontendMasters/api-design-node-v3/blob/lesson-5-solution/src/resources/user/user.model.js#L38-L51
   * and this: https://thinkster.io/tutorials/node-json-api/creating-the-user-model
   */
  return await UserModel.create({ ...user, hash: user.password })
}

export const findUserById = async (id: string) => {
  return await UserModel.findById(id)
}

export const findUser = async (query?: FilterQuery<User>) => {
  return await (query ? UserModel.find(query) : UserModel.find())
}

export const findOneUser = async (query: FilterQuery<User>) => {
  return await UserModel.findOne(query)
}

export const updateUser = async (id: string, update: Partial<User>) => {
  // Is it normal to do this check, which means every update has 2 queries - or should you just allow findByIdAndUpdate to do its thing?
  if (await UserModel.findById(id)) {
    return await UserModel.findByIdAndUpdate(id, { $set: update })
  } else {
    throw new Error(`No User with id ${id}`)
  }
}

export const removeUser = async (id: string) => {
  return await UserModel.findByIdAndDelete(id)
}
