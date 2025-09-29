import { ActionIcon, Button, Modal, ScrollArea } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { X } from 'lucide-react'

export const AddPatientModal = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const isMobile = useMediaQuery('(max-width: 50em)')

  return (
    <>
      <div>
        <Button
          variant="primary"
          onClick={() => {
            open()
          }}
        >
          Add new patient
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
        size={'xl'}
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
        </div>
      </Modal>
    </>
  )
}
