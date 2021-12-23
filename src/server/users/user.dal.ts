import { User, UserDTO } from '.'
import { UserModel } from './users.schema'
import { genericDal } from '../../utils'
import { FilterQuery, UpdateQuery } from 'mongoose'

// TODO:
// Figure out a better way to handle models with sensitive data
// As it is, sensitive data means I need to overwrite all of the generic accessors with custom ones that remove the salt and hash.

export const userDal = genericDal<User, UserDTO>(UserModel)

userDal.find = (query?: FilterQuery<User>) =>
  query
    ? UserModel.find(query).select('-salt -hash').lean().exec()
    : UserModel.find().select('-salt -hash').lean().exec()

userDal.findById = (id: string) =>
  UserModel.findById(id).select('-salt -hash').exec()

userDal.findOne = (query: FilterQuery<User>) =>
  UserModel.findOne(query).select('-salt -hash').exec()

userDal.update = (id: string, update: UpdateQuery<User>) =>
  UserModel.findByIdAndUpdate(id, update, { new: true })
    .select('-salt -hash')
    .lean()
    .exec()

// TODO: there has to be a better way to handle this
/**
 * Goals:
 * 1. don't store passwords in plain text
 * 2. have a method on the user model to automatically handle hashing
 * 3. have a salt for each method
 * the way the model currently works with the `.pre` method is a mix of this: https://github.com/FrontendMasters/api-design-node-v3/blob/lesson-5-solution/src/resources/user/user.model.js#L38-L51
 * and this: https://thinkster.io/tutorials/node-json-api/creating-the-user-model
 */
// Overwrite the generic Dal with a custom one
userDal.save = (user: UserDTO) =>
  UserModel.create({ ...user, hash: user.password })
