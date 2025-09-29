import { Box, Loader } from "@mantine/core";

export const PageLoader = () => {
  return (
    <div>
      <Box darkHidden className="flex flex-col items-center justify-center">
        {/* <AppLogo theme="light" /> */}
        <Loader color="brand" type="oval" size="xl" />
      </Box>
      <Box lightHidden className="flex flex-col items-center justify-center">
        {/* <AppLogo theme="dark" /> */}
        <Loader color="brand" type="oval" size="xl" />
      </Box>
    </div>
  );
};
