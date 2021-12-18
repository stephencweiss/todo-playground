import { hasMessage } from '../../utils'
import { Router } from 'express'
import { signup, signin } from './user.service'
import { UserDTO } from './users.model'
// import { Todo } from './todos.model'
// import { fetchTodoById } from '.'

export const userRouter = Router()
userRouter.route('/signup').post<{}, {}, UserDTO>(async (req, res) => {
  console.log({ body: req.body })
  res.status(201).send(await signup(req.body))
})
userRouter
  .route('/signin')
  .post<{}, {}, Pick<UserDTO, 'email' | 'password'>>(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).send({ message: 'need email and password' })
    }

    try {
      res.status(200).send(await signin(email, password))
    } catch (e) {
      if (hasMessage(e)) {
        // this is bad. i should be able to send more back as an error message than just the status code.
        console.log({ message: e.message })
        res.status(400).end()
      }
    }
  })

// TODO split the /signup and /signing into an `authRouter` and spearate from the userrouter
userRouter
  .route('/:id')
  .delete((req, res) => new Error('Not yet implemented'))
  .patch((req, res) => new Error('Not yet implemented'))
