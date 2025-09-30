import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { SearchResultField } from '@/components/Base/SearchResultField'
import { AddPatientModal } from '@/components/App/Patient/AddPatientModal'
import { FetchPatient } from '@/services/patient-service'
import axiosClient from '@/context/AxiosInterceptor'
import { PageLoader } from '@/components/Base/PageLoader'
import { PageErrorComponent } from '@/components/Base/PageErrorComponent'
import { PatientTableComponent } from '@/components/App/Patient/PatientTableComponent'
import { EmptyContentComponent } from '@/components/Base/EmptyContentComponent'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isLoading, error, data, refetch, isRefetchError, isRefetching } =
    useQuery({
      queryKey: ['patient-list'],
      queryFn: async () => {
        const { data, status } = await FetchPatient(axiosClient, {
          queryString: '',
        })
        if (status !== 200 || !data.success) {
          throw Error(data.message || 'Error processing request')
        }
        return data.data
      },
    })

  const isRequestLoading = useMemo(() => {
    return isLoading || isRefetching
  }, [isLoading, isRefetching])

  const isRequestError = useMemo(() => {
    return error || isRefetchError
  }, [error, isRefetchError])

  return (
    <div className="pt-10 flex flex-col gap-5">
      <SearchResultField />
      <div className="flex justify-between">
        <AddPatientModal />
      </div>

      <>
        {isRequestLoading && <PageLoader />}
        {!isRequestLoading && !isRequestError && data && data.length > 0 && (
          <PatientTableComponent data={data} />
        )}
        {!isRequestLoading && !isRequestError && data && data.length === 0 && (
          <EmptyContentComponent />
        )}
        {!isRequestLoading && isRequestError && (
          <PageErrorComponent onReloadClicked={refetch} />
        )}
      </>
    </div>
  )
}
