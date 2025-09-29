import { TextInput } from '@mantine/core'
import { useState } from 'react'
import { Search } from 'lucide-react'

export const SearchResultField = () => {
  const [searchKeyword, setSearchKeyword] = useState('')

  return (
    <div className="flex justify-center mx-auto max-w-[600px] min-w-[500px]">
      <TextInput
        type="search"
        placeholder="Find patient"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className="w-full"
        leftSection={<Search size={15} />}
      />
    </div>
  )
}
