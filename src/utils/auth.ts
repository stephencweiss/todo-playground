import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import add from 'date-fns/add'
import differenceInSeconds from 'date-fns/differenceInSeconds'
import { User } from '../server/users/users.model'
import { config } from '../config'

export function generateToken(body: object) {
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

export function verifyToken() {}

export function verifyPassword(
  password: string,
  user: Pick<User, 'salt' | 'hash'>,
): boolean {
  const hash = crypto
    .pbkdf2Sync(password, user.salt, 10000, 512, 'sha512')
    .toString('hex')
  return user.hash === hash
}
