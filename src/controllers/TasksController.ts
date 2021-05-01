import { Request } from 'express'
import * as yup from 'yup'

import { Response } from './Response'
import { TaskResponse, TasksView } from '../views/TasksView'
import { tasksValidator } from '../validators/TasksValidator'
import { DatabaseClient } from '../services/DatabaseClient'

export class TasksController {
  public async store(
    req: Request,
    res: Response<TaskResponse>,
  ): Promise<Response<TaskResponse>> {
    try {
      const {
        title,
        description,
        dueTo,
      } = await tasksValidator.store.validate(req.body, { abortEarly: false })

      const task = await DatabaseClient.client.task.create({
        data: {
          title,
          description,
          dueTo,
          user: { connect: { id: res.locals.currentUserId } },
          // userId: res.locals.currentUserId,
        },
      })

      return res.status(201).json({ data: TasksView.single(task) })
    } catch (err) {
      console.log(err)

      const yupErrors = err as yup.ValidationError
      return res.status(400).json({ message: yupErrors.errors })
    }
  }

  public async index(
    req: Request,
    res: Response<TaskResponse[]>,
  ): Promise<Response<TaskResponse[]>> {
    // TODO: add pagination, orderBy and search options
    const tasks = await DatabaseClient.client.task.findMany({
      where: { userId: res.locals.currentUserId },
    })

    return res.status(200).json({ data: TasksView.many(tasks) })
  }

  public async put(
    req: Request,
    res: Response<TaskResponse>,
  ): Promise<Response<TaskResponse>> {
    try {
      const {
        title,
        description,
        dueTo,
        completed,
      } = await tasksValidator.update.validate(req.body, { abortEarly: false })
      const { id } = req.params as { id: string }

      const task = await DatabaseClient.client.task.update({
        where: { id },
        data: {
          // TODO: add categories
          title,
          description,
          dueTo,
          completed,
        },
      })

      return res.status(200).json({ data: TasksView.single(task) })
    } catch (err) {
      const yupErrors = err as yup.ValidationError
      return res.status(400).json({ message: yupErrors.errors })
    }
  }

  public async delete(
    req: Request,
    res: Response<TaskResponse>,
  ): Promise<Response<TaskResponse>> {
    const { id } = req.params as { id: string }

    const task = await DatabaseClient.client.task.findUnique({ where: { id } })
    if (task?.userId !== res.locals.currentUserId) {
      return res.status(401).json({
        message: 'You do not have the rights permissions to delete this task',
      })
    }

    await DatabaseClient.client.task.delete({
      where: { id },
    })

    return res.status(204).json()
  }
}
