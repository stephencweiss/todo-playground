const request = require('supertest')
const { app } = require('./app')

describe('Server', () => {
  test('GET /todos', async () => {
    await request(app)
      .get('/api/todos')
      .expect(200)
      .then((response: any) => {
        expect(response.body).toEqual([])
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
  test('/GET unknown path returns 404', async () => {
    await request(app).get('/unknown-path').expect(404)
  })
})
