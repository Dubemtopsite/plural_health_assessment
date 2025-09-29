import {
  Accordion,
  ActionIcon,
  Button,
  Modal,
  ScrollArea,
  Select,
  Switch,
  TextInput,
} from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { CalendarDays, X } from 'lucide-react'
import { AddCircle } from 'iconsax-reactjs'
import { useForm } from '@mantine/form'
import { DatePickerInput } from '@mantine/dates'
import { yupResolver } from 'mantine-form-yup-resolver'
import type { CreateEditPatientModel } from '@/validator'
import { CreateEditPatientValidator } from '@/validator'
import { useAppModalToast } from '@/hook/useModalToast'
import { useLoadingStore } from '@/store/loadingStore'
import { CreatePatient } from '@/services/patient-service'
import axiosClient from '@/context/AxiosInterceptor'

export const AddPatientModal = () => {
  const { openModal } = useAppModalToast()
  const [opened, { open, close }] = useDisclosure(false)
  const isMobile = useMediaQuery('(max-width: 50em)')

  const form = useForm({
    initialValues: {
      title: '',
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      dateOfBirth: new Date(),
      phoneNumber: '',
      gender: '',
      address: '',
      country: '',
      state: '',
      insurer: '',
      insurancePlan: '',
      startDate: new Date(),
      endDate: new Date(),
      isPatientNew: true,
    },
    validate: yupResolver(CreateEditPatientValidator),
  })

  const handleSubmit = async (
    values: CreateEditPatientModel,
    action: 'CLOSE' | 'APPOINTMENT',
  ) => {
    const loadingStore = useLoadingStore.getState()

    try {
      loadingStore.setLoading('Processing request')
      const { status, data } = await CreatePatient(axiosClient, values)

      if (status !== 200 || data.error) {
        throw Error(data.message || 'Error processing request')
      }

      loadingStore.endLoading()
      close()
      form.reset()
    } catch (error) {
      loadingStore.endLoading()
      //  console.log((error as any).message ?? "Error");
      openModal({
        title: 'Error',
        message: (error as any).message ?? 'Error completing action',
      })
    }
  }

  return (
    <>
      <div>
        <Button
          variant="primary"
          onClick={() => {
            open()
          }}
        >
          <div className="flex gap-2 items-center">
            Add new patient{' '}
            <AddCircle size="20" color="#ffffff" variant="Bold" />
          </div>
        </Button>
      </div>

      <Modal
        opened={opened}
        onClose={() => {
          close()
        }}
        centered
        closeOnClickOutside={false}
        closeOnEscape={false}
        size={'2xl'}
        fullScreen={isMobile}
        withCloseButton={false}
        scrollAreaComponent={ScrollArea.Autosize}
        classNames={{
          body: 'h-full',
        }}
      >
        <div>
          <div className="flex justify-between">
            <div>
              <p className="text-[#051438] font-bold text-lg ">
                Add new patient
              </p>
              <small className="text-[#677597] ">
                Fill in the patient information in the fields provided below
              </small>
            </div>
            <ActionIcon
              onClick={() => {
                close()
              }}
              variant="transparent"
            >
              <X size={20} />
            </ActionIcon>
          </div>

          <form
            onSubmit={form.onSubmit((values) => handleSubmit(values, 'CLOSE'))}
            className="flex flex-col gap-5 pt-5 "
          >
            <div className="grid grid-cols-4 gap-3">
              <TextInput
                type="text"
                placeholder="First name"
                withAsterisk
                key={form.key('firstName')}
                {...form.getInputProps('firstName')}
              />
              <TextInput
                type="text"
                placeholder="Middle name"
                withAsterisk
                key={form.key('middleName')}
                {...form.getInputProps('middleName')}
              />
              <TextInput
                type="text"
                placeholder="Last name"
                withAsterisk
                key={form.key('lastName')}
                {...form.getInputProps('lastName')}
              />
              <Select
                placeholder="Title"
                allowDeselect={false}
                searchable
                data={['Mr', 'Mrs', 'Miss', 'Master', 'Dr', 'Prof']}
                key={form.key('title')}
                {...form.getInputProps('title')}
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              <DatePickerInput
                placeholder="Date of Birth"
                withAsterisk
                rightSection={<CalendarDays size={15} />}
                rightSectionPointerEvents="none"
                key={form.key('dateOfBirth')}
                {...form.getInputProps('dateOfBirth')}
              />

              <Select
                placeholder="Title"
                allowDeselect={false}
                searchable
                data={['Male', 'Female', 'Other']}
                key={form.key('gender')}
                {...form.getInputProps('gender')}
              />
              <TextInput
                type="tel"
                placeholder="Phone number"
                withAsterisk
                // readOnly={form.values.isPatientNew}
                key={form.key('phoneNumber')}
                {...form.getInputProps('phoneNumber')}
              />
              <div className="flex items-center">
                <Switch
                  defaultChecked
                  label="Is patient new to the hospital?"
                  key={form.key('isPatientNew')}
                  {...form.getInputProps('isPatientNew')}
                />
              </div>
            </div>

            <TextInput
              type="text"
              placeholder="Address"
              withAsterisk
              key={form.key('address')}
              {...form.getInputProps('address')}
            />

            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-2">
                <TextInput
                  type="tel"
                  placeholder="Email address"
                  withAsterisk
                  // readOnly={form.values.isPatientNew}
                  key={form.key('email')}
                  {...form.getInputProps('email')}
                />
              </div>

              <Select
                placeholder="Nationality"
                allowDeselect={false}
                searchable
                data={['Nigeria', 'Ghana', 'Togo']}
                key={form.key('country')}
                {...form.getInputProps('country')}
              />

              <Select
                placeholder="State of origin"
                allowDeselect={false}
                searchable
                data={['Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Lagos']}
                key={form.key('state')}
                {...form.getInputProps('state')}
              />
            </div>

            <div>
              <Accordion variant="filled" defaultValue={''}>
                <Accordion.Item value="insurance">
                  <Accordion.Control className="!bg-[#DFE2E9] rounded-[10px]">
                    <h5 className="text-lg font-semibold">
                      Insurance provider details
                    </h5>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <div className="flex flex-col gap-5">
                      <h5 className="font-semibold text-base">
                        Insurance provider
                      </h5>

                      <div className="grid grid-cols-4 gap-3">
                        <TextInput
                          type="text"
                          placeholder="Insurer name"
                          withAsterisk
                          key={form.key('insurer')}
                          {...form.getInputProps('insurer')}
                        />
                        <Select
                          placeholder="Insurance plan"
                          allowDeselect={false}
                          searchable
                          data={['Basic Plan', 'Standard Plan', 'Premium Plan']}
                          withAsterisk
                          key={form.key('insurancePlan')}
                          {...form.getInputProps('insurancePlan')}
                        />
                        <DatePickerInput
                          placeholder="Start date"
                          withAsterisk
                          rightSection={<CalendarDays size={15} />}
                          rightSectionPointerEvents="none"
                          key={form.key('startDate')}
                          {...form.getInputProps('startDate')}
                        />

                        <DatePickerInput
                          placeholder="End date"
                          withAsterisk
                          rightSection={<CalendarDays size={15} />}
                          rightSectionPointerEvents="none"
                          key={form.key('endDate')}
                          {...form.getInputProps('endDate')}
                        />
                      </div>
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </div>

            <div className="flex flex-row justify-end gap-4 items-center w-full bottom-0 right-0 left-0 px-4 pt-3 pb-1 bg-[var(--mantine-color-body)]">
              <Button
                variant="primary-outline"
                type="submit"
                className="!w-auto"
              >
                Save & close
              </Button>
              <Button
                variant="primary"
                className="!w-auto"
                onClick={() =>
                  form.onSubmit((values) => handleSubmit(values, 'APPOINTMENT'))
                }
              >
                Create application
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}
