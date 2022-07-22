import { Box, Flex, Text } from "@chakra-ui/react";

function ErrorMsg({ error }: { error: string }) {
  return (
    <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
      <Box textAlign="center">
        <Text color="red" my="10px">
          {error}
        </Text>
      </Box>
    </Flex>
  );
}

export default ErrorMsg;
