import { Flex, Text } from "@chakra-ui/react";
import React from "react";

function ErrorMsg({ error }: { error: string }) {
  return (
    <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
      <Text color="red">{error}</Text>
    </Flex>
  );
}

export default ErrorMsg;
