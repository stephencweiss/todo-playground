import { FilterQuery } from 'mongoose'
import { User } from './users.model'
import * as dal from './user.dal'

export const updateUser = async (id: string, updates: Partial<User>) => {
  // TODO: should probably check permissions to make sure you're updating your own user and/or you have permission
  return await dal.updateUser(id, updates)
}

export const fetchUsers = async (
  query?: FilterQuery<User>,
): Promise<any | User[]> => {
  return await dal.findUser(query)
}

export const fetchUserById = async (id: string): Promise<User | null> => {
  return await dal.findUserById(id)
}

export const removeUser = async (id: string) => {
  return await dal.removeUser(id)
}
