import { useEffect, useState } from "react";
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
import { setDoc, doc, onSnapshot } from "firebase/firestore";

import { db } from "../configs/firebase";
import CommentItem from "./comment-item";
import AddComment from "./add-comment";

type TCommentsModal = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

const CommentsModal = ({ isOpen, onClose, title }: TCommentsModal) => {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState<string[]>([]);

  const addComment = async (value: string, callback: () => void) => {
    setSubmitting(true);
    try {
      const commentref = doc(db, "comments", title);

      await setDoc(commentref, { comments: [...comments, value] });

      // Clear the error
      setError("");
      callback && callback();
    } catch (error) {
      if (typeof error === "string") setError(error);
      if (error instanceof Error) setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen || !title) return;

    const commentRef = doc(db, "comments", title);
    const unsubscribe = onSnapshot(commentRef, (doc) => {
      const currentData = doc.data();
      console.log({ currentData });
      if (currentData) {
        setComments(currentData?.comments);
        return;
      }
      setError("Be the first to comment...");
    });

    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return () => unsubscribe();
  }, [isOpen, title]);

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
