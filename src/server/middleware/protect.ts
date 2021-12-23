import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../../utils'
import { User } from '../users'
import { fetchUserById } from '../users/user.service'

declare module 'express' {
  export interface Request {
    user?: User
  }
}

const payloadHasId = (payload: unknown): payload is { id: string } => {
  return Boolean(payload && typeof payload === 'object' && 'id' in payload)
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearer = req?.headers?.authorization

  // TODO: consolidate the JWT parsing
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end()
  }

  const token = bearer.split('Bearer ')[1].trim()

  const payload = await verifyToken(token).catch((e) => new Error(e))

  if (!payloadHasId(payload) || payload instanceof Error) {
    return res.status(401).end()
  }

  const user = await fetchUserById(payload.id)

  if (!user) {
    return res.status(401).end()
  }

  req.user = user
  next()
}
