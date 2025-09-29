/* eslint-disable @typescript-eslint/naming-convention */
import type { AxiosInstance, AxiosResponse } from 'axios'

export type ServiceHandler<Payload, Return> = (
  axios: AxiosInstance,
  payload: Payload,
) => Promise<AxiosResponse<ApiResponse<Return>, any>>

export interface ApiResponse<Data> {
  data?: Data
  error: boolean
  code?: any
  message: string
}
