import { FilterQuery } from 'mongoose'
import { User } from './users.model'
import { userDal } from './user.dal'

export const updateUser = async (id: string, updates: Partial<User>) =>
  // TODO: should probably check permissions to make sure you're updating your own user and/or you have permission
  await userDal.update(id, updates)

export const fetchUsers = async (
  query?: FilterQuery<User>,
): Promise<any | User[]> => await userDal.find(query)

export const fetchUserById = async (id: string): Promise<User | null> =>
  await userDal.findById(id)

export const removeUser = async (id: string) => await userDal.deleteById(id)
