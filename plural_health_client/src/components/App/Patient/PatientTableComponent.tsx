import { Table } from '@mantine/core'
import { PatientTableItem } from './PatientTableItem'
import type { PatientListItem } from '@/model/patient-model'

interface Props {
  data: Array<PatientListItem>
}

export const PatientTableComponent = ({ data }: Props) => {
  return (
    <div className="patient-table">
      <Table.ScrollContainer minWidth={420}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={30} />
              <Table.Th w={30}>#</Table.Th>
              <Table.Th>Patient Information</Table.Th>
              <Table.Th></Table.Th>
              <Table.Th>Clinic</Table.Th>
              <Table.Th className="!w-[115px]">Wallet bal. (₦)</Table.Th>
              <Table.Th className="!text-center">Time/Date</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th w={30}></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((item, index) => {
              return <PatientTableItem item={item} index={index} />
            })}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  )
}
