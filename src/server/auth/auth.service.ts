import { UserDTO } from '../users/users.model'
import { userDal } from '../users/user.dal'
import { generateToken, verifyPassword } from '../../utils/auth'

export const signup = async (user: UserDTO): Promise<string> => {
  const { _id: id, username, email, salt, hash } = await userDal.save(user)
  // console.log({ user, salt, hash })
  return generateToken({ id, email, username })
}

export const signin = async (
  email: string,
  password: string,
): Promise<string> => {
  try {
    const user = await userDal.findOneSensitive({ email }).exec()
    if (!user) {
      throw new Error('Invalid email and/or password.')
    }

    const match = verifyPassword(password, user)

    if (!match) {
      throw new Error('Invalid email and/or password.')
    }
    const { _id: id, username } = user
    return generateToken({ id, email, username })
  } catch (error) {
    throw error
  }
}
