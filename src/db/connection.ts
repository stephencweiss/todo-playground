import { MongoClient } from 'mongodb'
import { config } from '../config'

const CONNECTION_STRING = `mongodb+srv://${config.dbUser}:${config.dbPassword}@sandbox.tv0tb.mongodb.net/todo-playground?retryWrites=true&w=majority`

async function connect() {
  const client = new MongoClient(CONNECTION_STRING, {
    // TODO: Do load testing on pool sizing
    maxPoolSize: 10,
    minPoolSize: 1,
  })

  await client.connect()
  return client
}

const pool = await connect()

const dbName = process.env.NODE_ENV === 'test' ? 'todo-test' : 'todo-playground'
export const _db = await pool.db(dbName)

// should probably move this to a different place and make it clear it's really only meant for using with tests (though there's nothing test specific about it)
export async function resetCollection(collectionName: string) {
  await _db.collection(collectionName).deleteMany({})
}

// export async function listDatabases(client: any) {
//   const databasesList = await client.db().admin().listDatabases()

//   console.log('Databases:')
//   databasesList.databases.forEach((db: any) => console.log(` - ${db.name}`))
// }

export async function useDatabase(client: any, dbName: string) {
  const used = await client.db(dbName)
  console.log({ used })
  return used
}

// export async function listCollections(db: any) {
//   const collectionsList = await db.listCollections()
//   console.log('Collections:')
//   await collectionsList.forEach((c: any) => console.log({ c }))
//   await collectionsList.rewind()
//   const arr = await collectionsList.toArray()
//   console.log({ arr })
// }
