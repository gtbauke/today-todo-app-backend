import * as yup from 'yup'

export const tasksValidator = {
  store: yup.object({
    title: yup.string().required(),
    description: yup.string(),
    dueTo: yup.date().required(),
  }),
}
