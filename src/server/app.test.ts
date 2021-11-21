const request = require('supertest')
const { app } = require('./app')

describe('Server', () => {
  test('/GET todos', async () => {
    await request(app)
      .get('/api/todos')
      .expect(200)
      .then((response: any) => {
        expect(response.body).toEqual([])
      })
  })
  test('/GET unknown path returns 404', async () => {
    await request(app).get('/unknown-path').expect(404)
  })
})
