import * as yup from 'yup'

export const categoriesValidator = {
  store: yup.object({
    name: yup.string().required(),
  }),
}
