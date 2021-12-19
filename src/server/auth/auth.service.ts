import { UserDTO } from '../users/users.model'
import * as dal from '../users/user.dal'
import { hasMessage } from '../../utils'
import { generateToken, verifyPassword } from '../../utils/auth'

export const signup = async (user: UserDTO): Promise<string> => {
  try {
    const { _id: id, username, email } = await dal.saveUser(user)
    return generateToken({ id, email, username })
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

    const match = verifyPassword(password, user)

    if (!match) {
      throw new Error('401')
    }
    // if (!match) {
    //   return res.status(401).send(invalid)
    // }
    const { _id: id, username } = user
    return generateToken({ id, email, username })
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
