import { Flex } from "@chakra-ui/react";
import { ReactComponent as LoadingIcon } from "../../assets/loading.svg";

function LoadingSpinner() {
  return (
    <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
      <LoadingIcon />
    </Flex>
  );
}

export default LoadingSpinner;
