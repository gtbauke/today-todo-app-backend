import * as yup from 'yup'

export const usersValidator = {
  store: yup.object({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup
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
      .required(),
  }),
}
