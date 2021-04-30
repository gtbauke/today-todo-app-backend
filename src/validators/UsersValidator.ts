import * as yup from 'yup'

const passwordValidator = yup
  .string()
  .min(7)
  .matches(/[a-z]/, {
    message: 'password must contain at least one lowercase letter',
  })
  .matches(/[A-Z]/, {
    message: 'password must contain at least one uppercase letter',
  })
  .matches(/[\d]/, { message: 'password must contain at least one digit' })
  .matches(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/, {
    message: 'password must contain at least one special character',
  })
  .required()

export const usersValidator = {
  store: yup.object({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: passwordValidator,
  }),

  login: yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  }),
}
