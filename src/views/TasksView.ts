import { Category, Task } from '.prisma/client'

export interface TaskResponse {
  id: string
  title: string
  description: string | null
  dueTo: Date
  ownerId: string
  completed: boolean
}

export interface TaskWithCategories {
  id: string
  title: string
  description: string | null
  dueTo: Date
  ownerId: string
  completed: boolean
  categories: string[]
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

  public static singleWithCategories(
    task: (Task & { categories: Category[] }) | null,
  ): TaskWithCategories {
    if (!task) return {} as TaskWithCategories

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      dueTo: task.dueTo,
      ownerId: task.userId,
      completed: task.completed,
      categories: task.categories.map(c => c.name),
    }
  }

  public static manyWithCategories(
    tasks: (Task & { categories: Category[] })[],
  ): TaskWithCategories[] {
    return tasks.map(this.singleWithCategories)
  }
}
