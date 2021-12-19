import mongoose, { ConnectionOptions } from 'mongoose'
import { config } from '../config'

const { name, user, password } = config?.db ?? {}
const CONNECTION_STRING = `mongodb+srv://${user}:${password}@sandbox.tv0tb.mongodb.net/${name}?retryWrites=true&w=majority`

export async function dbConnect(opts: ConnectionOptions = {}) {
  try {
    return await mongoose.connect(CONNECTION_STRING, {
      // TODO: Do load testing on pool sizing
      maxPoolSize: 10,
      minPoolSize: 1,
      ...opts,
    })
  } catch (e) {
    console.log(
      `There was an error establishing a connection to Mongo via Mongoose:\n`,
      e,
    )
  }
}

mongoose.connection.on('error', (err) =>
  console.log('There was an error with the Mongoose connection:\n', err),
)
