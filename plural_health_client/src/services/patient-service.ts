import { validateStatus } from './utils'
import type { ServiceHandler } from './type'

export const FetchPatient: ServiceHandler<
  { queryString: string },
  any
> = async (axios, { queryString }) => {
  return await axios.get(`/patient?${queryString}`, validateStatus)
}
