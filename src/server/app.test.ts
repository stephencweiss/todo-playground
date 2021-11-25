const request = require('supertest')
const { app } = require('./app')
const { _resetDb } = require('./db')

describe('Server', () => {
  beforeEach(() => {
    _resetDb()
  })
  test('GET /todos', async () => {
    await request(app)
      .get('/api/todos')
      .expect(200)
      .then((response: any) => {
        expect(response.body).toEqual([])
      })
  })
  test('POST /todos', async () => {
    const test = { description: 'Test' }
    await request(app)
      .post('/api/todos')
      .send(test)
      .expect(201)
      .then((response: any) => {
        expect(response.body.id).toEqual(1)
        expect(response.body.description).toEqual(test.description)
      })
  })
  test('GET /todos/:id', async () => {
    const id = 1
    await request(app)
      .get(`/api/todos/${id}`)
      .expect(404)
      .then((response: any) => {
        expect(response.error.text).toContain(`No TODO with id ${id}`)
      })
  })
  test('PATCH /todos/:id', async () => {
    const original = { description: 'Test' }
    const updated = { description: 'Updated-Test' }
    await request(app).post('/api/todos').send(original)

    await request(app).patch('/api/todos/1').send(updated).expect(204)
  })
  test('DELETE /todos/:id', async () => {
    const original = { description: 'Test' }
    const updated = { description: 'Updated-Test' }
    await request(app).post('/api/todos').send(original)

    await request(app).patch('/api/todos/1').send(updated).expect(204)
  })
  test('/GET unknown path returns 404', async () => {
    await request(app).get('/unknown-path').expect(404)
  })
})
