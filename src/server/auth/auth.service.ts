import { UserDTO } from '../users/users.model'
import { userDal } from '../users/user.dal'
import { hasMessage } from '../../utils'
import { generateToken, verifyPassword } from '../../utils/auth'

export const signup = async (user: UserDTO): Promise<string> => {
  try {
    const { _id: id, username, email } = await userDal.save(user)
    return generateToken({ id, email, username })
  } catch (error) {
    // I suspect this will error if we violate constraints on the db (i.e., we try to create a duplicate user)
    console.log(error)
    return 'fail'
  }
}

export const signin = async (
  email: string,
  password: string,
): Promise<string> => {
  try {
    const user = await userDal.findOne({ email })

    if (!user) {
      throw new Error('401')
    }

    const match = verifyPassword(password, user)

    if (!match) {
      throw new Error('401')
    }
    const { _id: id, username } = user
    return generateToken({ id, email, username })
  } catch (e) {
    if (hasMessage(e)) {
      throw e
    }
    throw new Error('500')
  }
}
