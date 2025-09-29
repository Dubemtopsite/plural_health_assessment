import * as Yup from 'yup'

/* For Admin Login */
export const LoginValidator = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().required('Password is required'),
})

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LoginRequestModel
  extends Yup.InferType<typeof LoginValidator> {}
