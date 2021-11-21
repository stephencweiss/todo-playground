const express = require('express')

export const app = express()
const todoRouter = express.Router()

type Todo = {
  id: number
  description: string
  done?: true
}
const db: Todo[] = []

todoRouter.route('/').get((req: any, res: any) => res.send(db))
todoRouter
  .route('/:id')
  .get((req: any, res: any) => new Error('Not yet implemented'))
  .post((req: any, res: any) => new Error('Not yet implemented'))
  .put((req: any, res: any) => new Error('Not yet implemented'))
  .patch((req: any, res: any) => new Error('Not yet implemented'))
  .delete((req: any, res: any) => new Error('Not yet implemented'))

app.use('/api/todos', todoRouter)

app.get('*', (_req: any, res: any) => res.status(404).send())
