import { Category } from '.prisma/client'

export interface CategoryResponse {
  id: string
  name: string
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
}
