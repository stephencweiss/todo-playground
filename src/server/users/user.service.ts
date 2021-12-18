import { FilterQuery } from 'mongoose'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import add from 'date-fns/add'
import differenceInSeconds from 'date-fns/differenceInSeconds'
import { UserDTO, User } from './users.model'
import * as dal from './user.dal'
import { config } from '../../config'
import { hasMessage } from '../../utils'

export const signup = async (user: UserDTO): Promise<string> => {
  try {
    const { _id: id, username, email } = await dal.saveUser(user)
    return generateJWT({ id, email, username })
  } catch (error) {
    // I suspect this will error if we violate constraints on the db (i.e., we try to create a duplicate user)
    console.log(error)
    return 'fail'
  }
}

// I don't like anything about this. Need ot figure out a better division of labor between router/service/dal
export const signin = async (
  email: string,
  password: string,
): Promise<string> => {
  try {
    // todo - figure out what i'm doing wrong with the types that i can't do .select / .lean, etc.
    const user = await dal.findOneUser({ email })
    // const user = ((await dal.findUser({ email })) as any)
    //   .select('email password')
    //   .exec()
    console.log({ user })

    if (!user) {
      throw new Error('401')
    }

    const match = checkPassword(password, user)

    if (!match) {
      throw new Error('401')
    }
    // if (!match) {
    //   return res.status(401).send(invalid)
    // }

    const { _id: id, username } = user
    return generateJWT({ id, email, username })

    return 'false'
  } catch (e) {
    if (hasMessage(e)) {
      throw e
    }
    throw new Error('500')
  }

  // try {
  //   const user = await dal.findUser({ username })

  //   // the user _should_ have an instance method of `validPassword`
  //   user.map((u) => console.log({ u }))
  //   return 'success!'
  // } catch (error) {
  //   return 'failed!'
  // }
}

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

function generateJWT(body: object) {
  const now = new Date()
  const future = add(now, { days: config.jwtExpiryDays })
  const diff = differenceInSeconds(future, now)
  console.log({
    exp: diff,
    now,
    future,
  })

  return jwt.sign(
    {
      ...body,
      exp: diff,
    },
    config.jwtSecret ?? '',
  )
}

export function checkPassword(
  password: string,
  user: Pick<User, 'salt' | 'hash'>,
): boolean {
  const hash = crypto
    .pbkdf2Sync(password, user.salt, 10000, 512, 'sha512')
    .toString('hex')
  return user.hash === hash
}
