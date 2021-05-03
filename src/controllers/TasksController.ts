import { Request } from 'express'
import * as yup from 'yup'

import { Response } from './Response'
import { TaskResponse, TasksView, TaskWithCategories } from '../views/TasksView'
import { tasksValidator } from '../validators/TasksValidator'
import { DatabaseClient } from '../services/DatabaseClient'

export class TasksController {
  public async store(
    req: Request,
    res: Response<TaskWithCategories>,
  ): Promise<Response<TaskWithCategories>> {
    try {
      const {
        title,
        description,
        dueTo,
        categories,
      } = await tasksValidator.store.validate(req.body, { abortEarly: false })

      const categoriesData = categories
        ? categories.map(c => ({ name: c }))
        : []

      const task = await DatabaseClient.client.task.create({
        data: {
          title,
          description,
          dueTo,
          user: { connect: { id: res.locals.currentUserId } },
          categories: { connect: categoriesData },
          // userId: res.locals.currentUserId,
        },
        include: { categories: true },
      })

      return res
        .status(201)
        .json({ data: TasksView.singleWithCategories(task) })
    } catch (err) {
      console.log(err)

      const yupErrors = err as yup.ValidationError
      return res.status(400).json({ message: yupErrors.errors })
    }
  }

  public async index(
    req: Request,
    res: Response<TaskWithCategories[]>,
  ): Promise<Response<TaskWithCategories[]>> {
    // TODO: add pagination, orderBy and search options
    const tasks = await DatabaseClient.client.task.findMany({
      where: { userId: res.locals.currentUserId },
      include: { categories: true },
    })

    return res.status(200).json({ data: TasksView.manyWithCategories(tasks) })
  }

  public async view(
    req: Request,
    res: Response<TaskWithCategories>,
  ): Promise<Response<TaskWithCategories>> {
    const { id } = req.params as { id: string }
    const task = await DatabaseClient.client.task.findUnique({
      where: { id },
      include: { categories: true },
    })

    if (task?.userId !== res.locals.currentUserId) {
      return res.status(401).json({
        message: 'You do not hve the right permissions to view this task',
      })
    }

    return res.status(200).json({ data: TasksView.singleWithCategories(task) })
  }

  public async put(
    req: Request,
    res: Response<TaskWithCategories>,
  ): Promise<Response<TaskWithCategories>> {
    try {
      const {
        title,
        description,
        dueTo,
        completed,
        categories,
      } = await tasksValidator.update.validate(req.body, { abortEarly: false })
      const { id } = req.params as { id: string }

      const oldTask = await DatabaseClient.client.task.findUnique({
        where: { id },
        select: { categories: true },
      })

      if (!oldTask) {
        return res.status(404).json({ message: 'Task not found' })
      }

      const categoriesData = categories
        ? [
            ...oldTask.categories.map(c => ({ name: c.name })),
            ...categories.map(c => ({ name: c })),
          ]
        : []

      const task = await DatabaseClient.client.task.update({
        where: { id },
        data: {
          title,
          description,
          dueTo,
          completed,
          categories: { set: categoriesData },
        },
        include: { categories: true },
      })

      return res
        .status(200)
        .json({ data: TasksView.singleWithCategories(task) })
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
