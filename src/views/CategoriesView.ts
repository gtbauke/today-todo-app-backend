import { Category, Task } from '.prisma/client'

import { TaskResponse, TasksView } from './TasksView'

export interface CategoryResponse {
  id: string
  name: string
}

export interface CategoryWithTasksResponse {
  id: string
  name: string
  tasks: TaskResponse[]
}

export interface CategoryWithMetadata {
  id: string
  name: string
  tasks: number
  completedTasks: number
}

export class CategoiresView {
  public static single(category: Category): CategoryResponse {
    return {
      id: category.id,
      name: category.name,
    }
  }

  public static many(categories: Category[]): CategoryResponse[] {
    return categories.map(this.single)
  }

  public static manyWithMetadata(
    categories: (Category & { tasks: number; completedTasks: number })[],
  ): CategoryWithMetadata[] {
    return categories.map(c => ({
      id: c.id,
      name: c.name,
      tasks: c.tasks,
      completedTasks: c.completedTasks,
    }))
  }

  public static singleWithTasks(
    category: Category & { tasks: Task[] },
  ): CategoryWithTasksResponse {
    return {
      id: category.id,
      name: category.name,
      tasks: TasksView.many(category.tasks),
    }
  }
}
