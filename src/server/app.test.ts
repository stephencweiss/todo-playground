import request from 'supertest'
import { app } from './app'

describe('Server', () => {
  test('/GET unknown path returns 404', async () => {
    await request(app).get('/unknown-path').expect(404)
  })
})
