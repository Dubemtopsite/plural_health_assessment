import { Box, Loader, LoadingOverlay } from '@mantine/core'
// import { AppLogo } from "../Icons/AppLogo";
import React from 'react'
import { useLoadingStore } from '@/store/loadingStore'

export const PageLoaderOverlay = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const isLoaderVisible = useLoadingStore((state) => state.loading)
  // const loadingText = useLoadingStore((state) => state.loadingText);

  const renderLoaderProps = () => {
    return (
      <div>
        <Box darkHidden className="flex flex-col items-center justify-center">
          {/* <AppLogo theme="light" /> */}
          <Loader color="brand" type="dots" size="xl" />
        </Box>
        <Box lightHidden className="flex flex-col items-center justify-center">
          {/* <AppLogo theme="dark" /> */}
          <Loader color="brand" type="dots" size="xl" />
        </Box>
      </div>
    )
  }

  return (
    <>
      <LoadingOverlay
        visible={isLoaderVisible}
        zIndex={1000}
        overlayProps={{ fixed: true, blur: 2 }}
        loaderProps={{ children: renderLoaderProps() }}
      />
      {children}
    </>
  )
}
