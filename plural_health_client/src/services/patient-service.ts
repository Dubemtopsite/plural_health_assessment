import { validateStatus } from './utils'
import type { ServiceHandler } from './type'
import type { CreateEditPatientModel } from '@/validator'
import type { PatientListItem } from '@/model/patient-model'

export const FetchPatient: ServiceHandler<
  { queryString: string },
  Array<PatientListItem>
> = async (axios, { queryString }) => {
  return await axios.get(`/patient?${queryString}`, validateStatus)
}

export const CreatePatient: ServiceHandler<
  CreateEditPatientModel,
  any
> = async (axios, payload) => {
  return await axios.post(`/patient`, payload, validateStatus)
}
