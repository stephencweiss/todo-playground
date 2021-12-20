import { hasMessage } from '../../utils'
import { Request, Response } from 'express'
import * as svc from './auth.service'
import { UserDTO } from '../users/users.model'

export const signin = async (
  req: Request<Pick<UserDTO, 'email' | 'password'>>,
  res: Response,
) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).send({ message: 'need email and password' })
  }

  try {
    res.status(200).send(await svc.signin(email, password))
  } catch (e) {
    if (hasMessage(e)) {
      // this is bad. i should be able to send more back as an error message than just the status code.
      console.log({ message: e.message })
      res.status(400).end()
    }
  }
}

export const signup = async (req: Request<{}, {}, UserDTO>, res: Response) => {
  console.log({ body: req.body })
  res.status(201).send(await svc.signup(req.body))
}