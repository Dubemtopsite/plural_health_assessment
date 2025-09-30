import { ActionIcon, Avatar, Menu, Table } from '@mantine/core'
import { CircleSmall, EllipsisVertical } from 'lucide-react'
import dayjs from 'dayjs'
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
      <Table.Td>
        <div className="text-center">
          <p className="font-semibold text-[#D6AB00]">
            {dayjs(item.createdAt).format('hh:mm A')}
          </p>
          <p className="font-semibold text-[#D6AB00]">
            {dayjs(item.createdAt).format('DD MMM YYYY')}
          </p>
        </div>
      </Table.Td>
      <Table.Td></Table.Td>
      <Table.Td>
        <Menu shadow="md" width={220}>
          <Menu.Target>
            <ActionIcon variant="transparent">
              <EllipsisVertical size={20} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label className="!text-[#051438] !text-sm !font-semibold">
              Create appointment
            </Menu.Label>
            <Menu.Label className="!text-[#051438] !text-sm !font-semibold">
              Create invoice
            </Menu.Label>
            <Menu.Label className="!text-[#051438] !text-sm !font-semibold">
              View patient profile{' '}
            </Menu.Label>
            <Menu.Label className="!text-[#051438] !text-sm !font-semibold">
              View next of kin
            </Menu.Label>
            <Menu.Label className="!text-[#051438] !text-sm !font-semibold">
              Add demographic info
            </Menu.Label>
            <Menu.Label className="!text-[#051438] !text-sm !font-semibold">
              Update insurance details
            </Menu.Label>
            <Menu.Label className="!text-[#051438] !text-sm !font-semibold">
              Scan paper records
            </Menu.Label>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  )
}
