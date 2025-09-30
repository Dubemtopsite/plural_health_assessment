import { Avatar, Table } from '@mantine/core'
import { CircleSmall } from 'lucide-react'
import type { PatientListItem } from '@/model/patient-model'
import { computeAge, setCurrencyFormat } from '@/utils'

export const PatientTableItem = ({
  item,
  index,
}: {
  item: PatientListItem
  index: number
}) => {
  return (
    <Table.Tr key={item.patientId}>
      <Table.Td></Table.Td>
      <Table.Td>
        <span className="font-semibold">{index + 1}</span>
      </Table.Td>
      <Table.Td>
        <div className="flex gap-2 flex-row items-center">
          <div>
            <Avatar radius="xl" />
          </div>
          <div>
            <p className="text-[#051438] font-semibold">
              {item.lastName} {item.firstName}
            </p>
            <span className="text-[#677597] text-xs flex items-center gap-1">
              {item.patientUid} <CircleSmall size={9} /> {item.gender}{' '}
              <CircleSmall size={9} /> {computeAge(item.birthDate) + 'yrs'}
            </span>
          </div>
        </div>
      </Table.Td>
      <Table.Td></Table.Td>
      <Table.Td>
        <span className="">Neurology</span>
      </Table.Td>
      <Table.Td className="font-semibold">
        {setCurrencyFormat(item.wallet.balance)}
      </Table.Td>
      <Table.Td></Table.Td>
      <Table.Td></Table.Td>
      <Table.Td></Table.Td>
    </Table.Tr>
  )
}
