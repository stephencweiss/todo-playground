import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'
import { verifyToken } from '../../utils'
import { User } from '../users'
import { UserModel } from '../users/users.schema'

declare module 'express' {
  export interface Request {
    user?: User
  }
}

const payloadHasId = (payload: unknown): payload is { id: Types.ObjectId } => {
  return Boolean(payload && typeof payload === 'object' && 'id' in payload)
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearer = req?.headers?.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end()
  }

  const token = bearer.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
    if (!payloadHasId(payload)) {
      throw new Error('Token missing required information')
    }
  } catch (e) {
    return res.status(401).end()
  }

  const user = await UserModel.findById(payload.id).select('-salt -hash')

  console.log(`temp: verify user doesn't have sensitive information here: `, {
    user,
  })
  if (!user) {
    return res.status(401).end()
  }

  req.user = user
  next()
}
