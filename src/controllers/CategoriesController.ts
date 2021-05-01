import { Request } from 'express'
import * as yup from 'yup'

import { Response } from './Response'
import { CategoryResponse, CategoiresView } from '../views/CategoriesView'
import { categoriesValidator } from '../validators/CategoriesValidator'
import { DatabaseClient } from '../services/DatabaseClient'

export class CategoriesController {
  public async store(
    req: Request,
    res: Response<CategoryResponse>,
  ): Promise<Response<CategoryResponse>> {
    try {
      const { name } = await categoriesValidator.store.validate(req.body, {
        abortEarly: false,
      })

      if (
        await DatabaseClient.client.category.findUnique({ where: { name } })
      ) {
        return res
          .status(400)
          .json({ message: `A category with the name ${name} already exists` })
      }

      const category = await DatabaseClient.client.category.create({
        data: { name, user: { connect: { id: res.locals.currentUserId } } },
      })

      return res.status(201).json({ data: CategoiresView.single(category) })
    } catch (err) {
      const yupError = err as yup.ValidationError
      return res.status(400).json({ message: yupError.errors })
    }
  }

  public async delete(
    req: Request,
    res: Response<never>,
  ): Promise<Response<never>> {
    const { id } = req.params as { id: string }

    await DatabaseClient.client.category.delete({ where: { id } })

    return res.status(204).json()
  }
}
