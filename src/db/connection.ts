import mongoose from 'mongoose'
import { config } from '../config'

const dbName = process.env.NODE_ENV === 'test' ? 'todo_test' : 'todo_playground'
const CONNECTION_STRING = `mongodb+srv://${config.dbUser}:${config.dbPassword}@sandbox.tv0tb.mongodb.net/${dbName}?retryWrites=true&w=majority`

export async function dbConnect() {
  try {
    return await mongoose.connect(CONNECTION_STRING, {
      // TODO: Do load testing on pool sizing
      maxPoolSize: 10,
      minPoolSize: 1,
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
