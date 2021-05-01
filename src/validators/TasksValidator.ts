import * as yup from 'yup'

export const tasksValidator = {
  store: yup.object({
    title: yup.string().required(),
    description: yup.string(),
    dueTo: yup.date().required(),
    categories: yup.array(yup.string()),
  }),

  update: yup.object({
    title: yup.string(),
    description: yup.string(),
    dueTo: yup.date(),
    completed: yup.bool(),
    categories: yup.array(yup.string()),
  }),
}
