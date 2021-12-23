import request from 'supertest'
import { app } from '../app'
import { UserDTO } from '../users'
import { UserModel } from '../users//users.schema'

describe('/auth router', () => {
  const PATH = '/api/auth'

  beforeEach(async () => {
    await UserModel.deleteMany()
  })
  test('POST /signup - first attempt will succeed, but duplicates will be rejected as validation errors', async () => {
    const user: UserDTO = { username: 'u', password: 'p', email: 'e@g.co' }

    await request(app).post(`${PATH}/signup`).send(user).expect(201)

    await request(app)
      .post(`${PATH}/signup`)
      .send(user)
      .expect(400)
      .then((response) => {
        const { error } = response.body
        if (error instanceof Error) {
          const { message } = error
          expect(message.includes('User validation failed')).toBeTruthy()
        }
      })
  })
  test('POST /signin - if no user exists, will get 400', async () => {
    const user: UserDTO = { username: 'u', password: 'p', email: 'e@g.co' }

    await request(app)
      .post(`${PATH}/signin`)
      .send(user)
      .expect(400)
      .then((response) => {
        const { error } = response.body
        // if (error instanceof Error) {
        //   const { message } = error
        //   console.log({ message })
        // } else {
        //   console.log(`something's amiss`)
        // }
      })
  })
  test('POST /signin - if credentials are missing, will get 400', async () => {
    const user: UserDTO = {} as UserDTO // { username: 'u', password: 'p', email: 'e@g.co' }

    await request(app)
      .post(`${PATH}/signin`)
      .send(user)
      .expect(400)
      .then((response) => {
        const { error } = response.body
        // if (error instanceof Error) {
        //   const { message } = error
        //   console.log({ message })
        // } else {
        //   console.log(`something's amiss`)
        // }
      })
  })
  test('POST /signin - if credentials are invalid, will get 400', async () => {
    const user: UserDTO = { username: 'u', password: 'p', email: 'e@g.co' }
    const badPW: UserDTO = { username: 'u', password: 'wrong', email: 'e@g.co' }
    const badEmail: UserDTO = {
      username: 'u',
      password: 'p',
      email: 'wrong@g.co',
    }

    await request(app).post(`${PATH}/signup`).send(user)

    await request(app)
      .post(`${PATH}/signin`)
      .send(badPW)
      .expect(400)
      .then((response) => {
        const { error } = response.body
        // if (error instanceof Error) {
        //   const { message } = error
        //   console.log({ message })
        // } else {
        //   console.log(`something's amiss`)
        // }
      })
    await request(app)
      .post(`${PATH}/signin`)
      .send(badEmail)
      .expect(400)
      .then((response) => {
        const { error } = response.body
        // if (error instanceof Error) {
        //   const { message } = error
        //   console.log({ message })
        // } else {
        //   console.log(`something's amiss`)
        // }
      })
  })
  test('POST /signin - if credentials are correct, will get 200', async () => {
    const user: UserDTO = { username: 'u', password: 'p', email: 'e@g.co' }

    await request(app).post(`${PATH}/signup`).send(user).expect(201)

    await request(app)
      .post(`${PATH}/signin`)
      .send(user)
      .expect(200)
      .then((response) => {
        const { error } = response.body
        // if (error instanceof Error) {
        //   const { message } = error
        //   console.log({ message })
        // } else {
        //   console.log(`something's amiss`)
        // }
      })
  })
})
