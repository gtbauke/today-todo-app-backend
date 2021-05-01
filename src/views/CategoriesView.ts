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
