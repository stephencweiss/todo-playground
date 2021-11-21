import request from 'supertest'
import { app } from './app'

describe('Server', () => {
  test('/GET todos', async () => {
    await request(app)
      .get('/todos')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([])
      })
  })
  test('/GET unknown path returns 404', async () => {
    await request(app).get('/unknown-path').expect(404)
  })
})
