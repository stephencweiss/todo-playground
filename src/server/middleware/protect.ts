import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'
import { verifyToken } from '../../utils'
import { UserModel } from '../users'

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

  const user = await UserModel.findById(payload.id)
    .select('-salt -hash')
    .lean()
    .exec()

  console.log(`temp: verify user doesn't have sensitive information here: `, {
    user,
  })
  if (!user) {
    return res.status(401).end()
  }

  //@ts-ignore -- TODO: fix the typings with an override, e.g. https://www.npmjs.com/package/@types/method-override
  req.user = user
  next()
}
