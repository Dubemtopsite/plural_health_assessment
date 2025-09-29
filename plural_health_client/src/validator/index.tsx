import * as Yup from 'yup'

/* For Admin Login */
export const LoginValidator = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().required('Password is required'),
})

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LoginRequestModel
  extends Yup.InferType<typeof LoginValidator> {}

export const CreateEditPatientValidator = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  firstName: Yup.string().required('First name is required'),
  middleName: Yup.string().optional(),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email().optional(),
  dateOfBirth: Yup.date().required('Date of birth is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  gender: Yup.string().required('Gender is required'),
  address: Yup.string().optional(),
  country: Yup.string().optional(),
  state: Yup.string().optional(),
  insurer: Yup.string().optional(),
  insurancePlan: Yup.string().optional(),
  startDate: Yup.date().optional(),
  endDate: Yup.date().optional(),
})

export type CreateEditPatientModel = Yup.InferType<
  typeof CreateEditPatientValidator
>
/* 
 {
      title: '',
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      dateOfBirth: new Date(),
      phoneNumber: '',
      gender: '',
      address: '',
      country: '',
      state: '',
      insurer: '',
      insurancePlan: '',
      startDate: new Date(),
      endDate: new Date(),
      isPatientNew: true,
    } */
