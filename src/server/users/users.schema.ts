import crypto from 'crypto'
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

import { User } from './users.model'

export const UserSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      index: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      trim: true,
      unique: true,
      uniqueCaseInsensitive: true,
    },
    email: {
      type: String,
      index: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      trim: true,
      unique: true,
      uniqueCaseInsensitive: true,
    },
    bio: String,
    image: String,
    hash: { type: String, required: [true, "can't be blank"] },
    salt: { type: String, required: [true, "can't be blank"] },
  },
  { timestamps: true },
)

UserSchema.pre('save', function (next) {
  if (!this.isModified('hash')) {
    return next()
  }

  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto
    .pbkdf2Sync(this.hash, this.salt, 10000, 512, 'sha512')
    .toString('hex')

  next()
})

// TODO: figure out why my instance methods weren't ever useful
// they were never available -- whatever i'm doing, i'm always operating on Documents, not Mongoose models 🤷‍♂️
// UserSchema.methods.checkPassword = function (password) {
//   const hash = crypto
//     .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
//     .toString('hex')
//   return this.hash === hash
// }

UserSchema.plugin(uniqueValidator, { message: 'is unavailable.' })

export const UserModel = mongoose.model('User', UserSchema)
