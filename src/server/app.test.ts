import request from 'supertest'
import { app } from './app'
import { TodoModel } from './todos/todos.schema'

describe('Server', () => {
  beforeEach(async () => {
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
    const test = { description: `Test ${new Date().toISOString()}` }
    await request(app)
      .post('/api/todo')
      .send(test)
      .expect(201)
      .then((response: any) => {
        expect(response.body.description).toEqual(test.description)
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

    const test = { description: `Test ${new Date().toISOString()}` }
    const posted = await request(app).post('/api/todo').send(test)

    const { _id } = posted.body

    await request(app)
      .get(`/api/todo/${_id}`)
      .expect(200)
      .then((response: any) => {
        expect(response.body._id).toBe(_id)
        expect(response.body.description).toBe(test.description)
      })
  })

  test('PATCH /todo/:id', async () => {
    const original = { description: 'Test' }
    const updated = { description: 'Updated-Test' }
    const posted = await request(app).post('/api/todo').send(original)
    const { _id } = posted.body
    await request(app).patch(`/api/todo/${_id}`).send(updated).expect(204)
  })

  test('DELETE /todo/:id', async () => {
    const original = { description: 'Test' }
    const posted = await request(app).post('/api/todo').send(original)

    const { _id } = posted.body
    await request(app).delete(`/api/todo/${_id}`).expect(204)
  })

  test('/GET unknown path returns 404', async () => {
    await request(app).get('/unknown-path').expect(404)
  })
})
