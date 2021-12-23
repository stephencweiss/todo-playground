import { Request, Response } from 'express'
import * as svc from './auth.service'
import { UserDTO } from '../users/users.model'

export const signin = async (
  req: Request<Pick<UserDTO, 'email' | 'password'>>,
  res: Response,
) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: new Error('need email and password') })
  }

  try {
    res.status(200).json({ data: await svc.signin(email, password) })
  } catch (error) {
    res.status(400).json({ error })
  }
}

export const signup = async (req: Request<{}, {}, UserDTO>, res: Response) => {
  try {
    res.status(201).json({ data: await svc.signup(req.body) })
  } catch (error) {
    res.status(400).json({ error })
  }
}
