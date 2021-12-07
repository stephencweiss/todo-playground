import request from 'supertest'
import { app } from './app'
import { _db, resetCollection } from '../db'

describe('Server', () => {
  beforeAll(async () => {
    await _db.collection('todo')
  })
  beforeEach(async () => {
    // _resetDb()
    resetCollection('todo')
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
        expect(response.body.acknowledged).toBeTruthy()
        expect(response.body.insertedId).toBeTruthy() // if i want the _actual_ object returned, i'll either need to fetch it or use mongoose which provides the object
      })
  })
  test('GET /todo/:id', async () => {
    const id = "61aec76836b372f9eeac4042"
    await request(app)
      .get(`/api/todo/${id}`)
      .expect(404)
      .then((response: any) => {
        expect(response.error.text).toContain(`No TODO with id ${id}`)
      })

    const test = { description: `Test ${new Date().toISOString()}` }
    const posted = await request(app).post('/api/todo').send(test)

    const {insertedId} = posted.body

    await request(app).get(`/api/todo/${insertedId}`).expect(200)
    .then((response: any) => {
      expect(response.body.length).toBe(1)
      expect(response.body[0]._id).toBe(insertedId)
      expect(response.body[0].description).toBe(test.description)
    })
  })

  test('PATCH /todo/:id', async () => {
    const original = { description: 'Test' }
    const updated = { description: 'Updated-Test' }
    const posted = await request(app).post('/api/todo').send(original)
    const { insertedId } = posted.body
    await request(app).patch(`/api/todo/${insertedId}`).send(updated).expect(204)
  })

  test('DELETE /todo/:id', async () => {
    const original = { description: 'Test' }
    const posted = await request(app).post('/api/todo').send(original)

    const { insertedId } = posted.body
    await request(app).delete(`/api/todo/${insertedId}`).expect(204)
  })

  test('/GET unknown path returns 404', async () => {
    await request(app).get('/unknown-path').expect(404)
  })
})
