import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";

import CommentItem from "../comment-item/comment-item";
import AddComment from "../add-comment/add-comment";
import useComments from "../../hooks/useComments";

type TCommentsModal = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

const CommentsModal = ({ isOpen, onClose, title }: TCommentsModal) => {
  const { error, comments, submitting, addComment } = useComments({
    title,
    isOpen,
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minH="400px" maxH="80vh" bg="gray.200">
          <ModalHeader bg="blue.600" color="white">
            {title}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody h="100%" overflowY="scroll">
            {error && comments?.length < 1 ? (
              <Text>{error}</Text>
            ) : (
              comments?.map((comment, index) => (
                <CommentItem key={index + comment} comment={comment} />
              ))
            )}
          </ModalBody>

          <ModalFooter px={0} pb={0}>
            <AddComment onSubmit={addComment} submitting={submitting} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommentsModal;
