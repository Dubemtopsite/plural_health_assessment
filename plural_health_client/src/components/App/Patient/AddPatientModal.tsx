import {
  ActionIcon,
  Button,
  Modal,
  ScrollArea,
  Select,
  Switch,
  TextInput,
} from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { X } from 'lucide-react'
import { AddCircle } from 'iconsax-reactjs'
import { useForm } from '@mantine/form'
import { DatePickerInput } from '@mantine/dates'

export const AddPatientModal = () => {
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
    // validate: yupResolver(LoginValidator),
  })

  const handleSubmit = (values: any) => {
    console.log(values)
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
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
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
          </form>
        </div>
      </Modal>
    </>
  )
}
