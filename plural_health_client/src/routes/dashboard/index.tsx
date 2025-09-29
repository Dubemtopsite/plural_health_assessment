import { createFileRoute } from '@tanstack/react-router'
import { SearchResultField } from '@/components/Base/SearchResultField'
import { AddPatientModal } from '@/components/App/Patient/AddPatientModal'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="pt-10 flex flex-col gap-5">
      <SearchResultField />
      <div className="flex justify-between">
        <AddPatientModal />
      </div>
    </div>
  )
}
