import { useState } from "react";
import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { MdSend } from "react-icons/md";

type TAddComment = {
  submitting: boolean;
  onSubmit: (value: string, callback: () => void) => void;
};
function AddComment({ submitting, onSubmit }: TAddComment) {
  const [value, setValue] = useState("");
  return (
    <Box w="100%" bg="white">
      <InputGroup size="md" alignItems="center" justifyContent="center">
        <Input
          borderRadius={0}
          value={value}
          pr="4.5rem"
          h="55px"
          type="text"
          placeholder="Enter comment"
          onChange={(event) => setValue(event.target.value)}
        />
        <InputRightElement width="4.5rem" h="100%" pr="1rem">
          <IconButton
            colorScheme="blue"
            aria-label="Add Comment"
            size="md"
            borderRadius="50%"
            isDisabled={!value}
            isLoading={submitting}
            onClick={() => {
              if (value) onSubmit(value, () => setValue(""));
            }}
            icon={<MdSend size={30} fill="white" />}
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}

export default AddComment;
