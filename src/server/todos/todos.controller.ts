import { Request, Response } from 'express'
import { hasMessage } from '../../utils'
import {
  fetchTodoById as getTodoById,
  fetchTodos,
  insertTodo,
  removeTodo,
  updateTodo as updtTodo,
} from './todos.service'
import { Todo } from './todos.model'
// import { crudControllers } from '../../utils'
// import { TodoModel } from './todos.schema'

// export const todoControllers = {
//   getOne: async (
//     req: Request<{ _id: string }, any, { user: { _id: string } }>,
//     res: Response,
//   ) => {
//     try {
//       const { _id: userId } = req.body.user
//       const { _id: modelId } = req.params

//       const doc = await TodoModel.findOne({ createdBy: userId, _id: modelId })
//         .lean()
//         .exec()

//       if (!doc) {
//         return res.status(400).end()
//       }
//       res.status(200).json({ data: doc })
//     } catch (e) {
//       console.error(e)
//       res.status(400).end()
//     }
//   },
// }

// export const getMany =
//   <T>(model: Model<T>) =>
//   async (req: Request<{}, {}, { user: { _id: string } }>, res: Response) => {
//     try {
//       const { _id: userId } = req.body.user
//       const docs = await (model as any)
//         .find({ createdBy: userId })
//         .lean()
//         .exec()

//       res.status(200).json({ data: docs })
//     } catch (e) {
//       console.error(e)
//       res.status(400).end()
//     }
//   }

// export const updateOne =
//   <T>(model: Model<T>) =>
//   async (req, res: Response) => {
//     try {
//       const updatedDoc = await model
//         .findOneAndUpdate(
//           {
//             createdBy: req.user._id,
//             _id: req.params.id,
//           },
//           req.body,
//           { new: true },
//         )
//         .lean()
//         .exec()

//       if (!updatedDoc) {
//         return res.status(400).end()
//       }

//       res.status(200).json({ data: updatedDoc })
//     } catch (e) {
//       console.error(e)
//       res.status(400).end()
//     }
//   }

// export const removeOne =
//   <T>(model: Model<T>) =>
//   async (req, res: Response) => {
//     try {
//       const removed = await model.findOneAndRemove({
//         createdBy: req.user._id,
//         _id: req.params.id,
//       })

//       if (!removed) {
//         return res.status(400).end()
//       }

//       return res.status(200).json({ data: removed })
//     } catch (e) {
//       console.error(e)
//       res.status(400).end()
//     }
//   }

// export const createOne =
//   <T>(model: Model<T>) =>
//   async (req, res: Response) => {
//     const createdBy = req.user._id
//     try {
//       const doc = await model.create({ ...req.body, createdBy })
//       res.status(201).json({ data: doc })
//     } catch (e) {
//       console.error(e)
//       res.status(400).end()
//     }
//   }

export const createOne = async (
  req: Request<{}, {}, Todo>,
  res: Response<{ data: Todo }>,
) => {
  // const createdBy = req.user._id
  try {
    // TODO: add the user to the Todo
    const insertedTodo = await insertTodo(req.body)
    //       const doc = await model.create({ ...req.body, createdBy })
    return res.status(201).json({ data: insertedTodo })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const fetchAllTodos = async (_req: Request, res: Response<Todo[]>) =>
  res.send(await fetchTodos())

export const fetchTodoById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params
    const found = await getTodoById(id)
    if (!found) throw new Error(`No TODO with id ${id}`)
    res.send(found)
  } catch (e: unknown) {
    if (hasMessage(e)) {
      res.status(404).send({ error: e.message })
    } else {
      res.status(404).send()
    }
  }
}

export const updateTodo = async (
  req: Request<{ id: string }, {}, Todo>,
  res: Response,
) => {
  try {
    const { id } = req.params
    res.status(204).send(await updtTodo(id, req.body))
  } catch (e) {
    res.status(400)
    if (hasMessage(e)) {
      res.send({ error: e.message })
    } else {
      res.send()
    }
  }
}

export const deleteTodo = (req: Request, res: Response) => {
  try {
    const { id } = req.params
    removeTodo(id)
    res.status(204).send()
  } catch (e) {
    res.status(400)
    if (hasMessage(e)) {
      res.send(e.message)
    }
    res.send()
  }
}
