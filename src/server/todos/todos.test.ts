import request from 'supertest'
import { app } from '../app'
import { TodoModel } from './todos.schema'
import { UserModel } from '../users/users.schema'
import { User } from '../users/users.model'

describe('Server', () => {
  let user: User
  beforeEach(async () => {
    await UserModel.deleteMany()
    user = await UserModel.create({ username: 'test', email: 't@g.co' })
    await TodoModel.deleteMany()
  })
  test('GET /todos', async () => {
    await request(app)
      .get('/api/todo')
      .expect(200)
      .then((response: any) => {
        expect(response.body).toEqual([])
      })
  })
  test('POST /todo', async () => {
    const test = {
      name: `Test ${new Date().toISOString()}`,
      due: new Date(),
      createdBy: user,
    }
    await request(app)
      .post('/api/todo')
      .send(test)
      .expect(201)
      .then((response: any) => {
        expect(response.body.name).toEqual(test.name)
        expect(response.body._id).toBeTruthy()
      })
  })
  test('GET /todo/:id', async () => {
    const id = '61aec76836b372f9eeac4042'
    await request(app)
      .get(`/api/todo/${id}`)
      .expect(404)
      .then((response: any) => {
        expect(response.error.text).toContain(`No TODO with id ${id}`)
      })

    const test = { name: `Test ${new Date().toISOString()}`, createdBy: user }
    const posted = await request(app).post('/api/todo').send(test)

    const { _id } = posted.body

    await request(app)
      .get(`/api/todo/${_id}`)
      .expect(200)
      .then((response: any) => {
        expect(response.body._id).toBe(_id)
        expect(response.body.name).toBe(test.name)
      })
  })

  test('PATCH /todo/:id', async () => {
    const original = { name: 'Test', due: new Date(), createdBy: user }
    const updated = { name: 'Updated-Test' }
    const posted = await request(app).post('/api/todo').send(original)
    const { _id } = posted.body
    await request(app).patch(`/api/todo/${_id}`).send(updated).expect(204)
  })

  test('DELETE /todo/:id', async () => {
    const original = { name: 'Test', due: new Date(), createdBy: user }
    const posted = await request(app).post('/api/todo').send(original)

    const { _id } = posted.body
    await request(app).delete(`/api/todo/${_id}`).expect(204)
  })
})
