import request from 'supertest'
import { app } from '../app'
import { TodoModel } from './todos.schema'
import { UserModel } from '../users/users.schema'

describe('Server', () => {
  const userInput = { username: 'test', email: 't@g.co', password: 'test123' }
  let jwt: string

  beforeEach(async () => {
    await UserModel.deleteMany()
    await TodoModel.deleteMany()
    jwt = await (
      await request(app).post('/api/auth/signup').send(userInput)
    ).body.data
  })

  test('GET /todos', async () => {
    await request(app)
      .get('/api/todo')
      .set({ authorization: `Bearer ${jwt}` })
      .expect(200)
      .then((response: any) => {
        expect(response.body).toEqual([])
      })
  })

  test('POST /todo', async () => {
    const test = {
      name: `Test ${new Date().toISOString()}`,
      due: new Date(),
    }
    await request(app)
      .post('/api/todo')
      .set({ authorization: `Bearer ${jwt}` })
      .send(test)
      .expect(201)
      .then((response: any) => {
        const { data } = response.body
        expect(data.name).toEqual(test.name)
        expect(data._id).toBeTruthy()
      })
  })

  test('GET /todo/:id', async () => {
    const id = '61aec76836b372f9eeac4042' // This is a TEST id; it is expected to *not* exist
    await request(app)
      .get(`/api/todo/${id}`)
      .set({ authorization: `Bearer ${jwt}` })
      .expect(404)
      .then((response: any) => {
        expect(response.body.error).toContain(`No TODO with id ${id}`)
      })

    const test = { name: `Test ${new Date().toISOString()}` }
    const posted = await request(app)
      .post('/api/todo')
      .set({ authorization: `Bearer ${jwt}` })
      .send(test)

    const { _id } = posted.body.data
    await request(app)
      .get(`/api/todo/${_id}`)
      .set({ authorization: `Bearer ${jwt}` })
      .expect(200)
      .then((response: any) => {
        const { data } = response.body
        expect(data._id).toBe(_id)
        expect(data.name).toBe(test.name)
      })
  })

  test('PATCH /todo/:id', async () => {
    const original = { name: 'Test', due: new Date() }
    const updated = { name: 'Updated-Test' }
    const posted = await request(app)
      .post('/api/todo')
      .set({ authorization: `Bearer ${jwt}` })
      .send(original)
    const { _id } = posted.body.data
    await request(app)
      .patch(`/api/todo/${_id}`)
      .set({ authorization: `Bearer ${jwt}` })
      .send(updated)
      .expect(204)
  })

  test('DELETE /todo/:id', async () => {
    const original = { name: 'Test', due: new Date() }
    const posted = await request(app)
      .post('/api/todo')
      .set({ authorization: `Bearer ${jwt}` })
      .send(original)

    const { _id } = posted.body.data
    await request(app)
      .delete(`/api/todo/${_id}`)
      .set({ authorization: `Bearer ${jwt}` })
      .expect(204)
  })
})
