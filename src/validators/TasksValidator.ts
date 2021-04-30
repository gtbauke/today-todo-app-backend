import * as yup from 'yup'

export const tasksValidator = {
  store: yup.object({
    title: yup.string().required(),
    description: yup.string(),
    dueTo: yup.date().required(),
  }),

  update: yup.object({
    title: yup.string(),
    description: yup.string(),
    dueTo: yup.date(),
    completed: yup.bool(),
    // todo: add categories
  }),
}
