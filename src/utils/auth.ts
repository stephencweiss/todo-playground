import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import add from 'date-fns/add'
import differenceInSeconds from 'date-fns/differenceInSeconds'
import { User } from '../server/users/users.model'
import { config } from '../config'
import { Types } from 'mongoose'

type TokenBody = {
  id: Types.ObjectId
  email?: string
  username?: string
}

export function generateToken(body: TokenBody) {
  const now = new Date()
  const future = add(now, { days: config.secrets?.expiration })
  const diff = differenceInSeconds(future, now)

  return jwt.sign(
    {
      ...body,
      exp: diff,
    },
    config.secrets?.secretPhrase ?? '',
  )
}

export const verifyToken = (token: string) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets?.secretPhrase ?? '', (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export function verifyPassword(
  password: string,
  user: Pick<User, 'salt' | 'hash'>,
): boolean {
  const hash = crypto
    .pbkdf2Sync(password, user.salt, 10000, 512, 'sha512')
    .toString('hex')
  return user.hash === hash
}
