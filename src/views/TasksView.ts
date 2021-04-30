import { Task } from '.prisma/client'

export interface TaskResponse {
  id: string
  title: string
  description: string | null
  dueTo: Date
  ownerId: string
  completed: boolean
  // TODO: add categories here
}

export class TasksView {
  public static single(task: Task): TaskResponse {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      dueTo: task.dueTo,
      ownerId: task.userId,
      completed: task.completed,
    }
  }

  public static many(tasks: Task[]): TaskResponse[] {
    return tasks.map(this.single)
  }
}
