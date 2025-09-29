import { Link } from '@tanstack/react-router'
import { Image } from '@mantine/core'
import dayjs from 'dayjs'

export default function Header() {
  return (
    <header className="py-2 px-8 flex gap-2 justify-between h-[48px] fixed w-full right-0 left-0 border-b border-[#DFE2E9]">
      <nav className="flex flex-row justify-between w-full">
        <Image src="/platform-logo.svg" alt="logo" className="!h-8 !w-auto" />
        <div className="flex flex-row gap-4">
          <p className="text-[#051438] font-bold text-lg">
            {dayjs().format('DD MMMM')}
          </p>
          <p className="text-[#677597] text-lg font-semibold">
            {dayjs().format('HH:mm A')}
          </p>
        </div>
        <div></div>
      </nav>
    </header>
  )
}
