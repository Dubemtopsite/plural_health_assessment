export interface PatientListItem {
  patientId: string
  patientUid: string
  title: string
  firstName: string
  lastName: string
  middleName: string
  email: string
  birthDate: Date
  phoneNumber: string
  address: string
  country: string
  stateOfOrigin: string
  image: string
  gender: string
  hasInsurance: boolean
  status: string
  wallet: Wallet
  insurance: Insurance
  createdAt: Date
  updatedAt: Date
}

export interface Insurance {
  insuranceId: string
  patientId: string
  insurer: string
  inusurancePlan: string
  startDate: Date
  endDate: Date
  isActive: boolean
  patient: null
  createdAt: Date
  updatedAt: Date
}

export interface Wallet {
  id: string
  patientId: string
  balance: number
  patient: null
  createdAt: Date
  updatedAt: Date
}
