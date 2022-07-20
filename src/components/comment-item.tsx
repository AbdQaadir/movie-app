import { Box, Flex } from "@chakra-ui/react";
import React from "react";

type TComment = {
  comment: string;
};
function CommentItem({ comment }: TComment) {
  return (
    <Flex w="100%" minH="30px" gap="10px" py="2">
      <Box bg="blue.600" borderRadius="50%" height="40px" w="45px"></Box>
      <Box bg="blue.600" w="100%" p={2} color="#fff" fontSize=".9rem">
        {comment}
      </Box>
    </Flex>
  );
}

export default CommentItem;
