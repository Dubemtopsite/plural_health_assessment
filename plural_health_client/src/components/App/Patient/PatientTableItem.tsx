import type { PatientListItem } from '@/model/patient-model'

export const PatientTableItem = ({
  item,
  index,
}: {
  item: PatientListItem
  index: number
}) => {
  return (
    <div className="flex flex-row gap-2">
      <div></div>
      <div>
        <span>{index + 1}</span>
      </div>
    </div>
  )
}
