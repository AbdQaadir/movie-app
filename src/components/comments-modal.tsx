import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { setDoc, doc, onSnapshot } from "firebase/firestore";

import { db } from "../App";
import Comment from "./comment";
import AddComment from "./add-comment";

type TCommentsModal = {
  title: string;
  children: ({
    handleClick,
  }: {
    handleClick: () => void;
  }) => string | React.ReactNode;
};

const CommentsModal = ({ children, title }: TCommentsModal) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const handleClick = () => {
    isOpen ? onClose() : onOpen();
  };

  // const getComments = async (title: string) => {
  //   setLoading(true);
  //   try {
  //     console.log({ title });
  //     const commentRef = doc(db, "comments", title);
  //     const commentSnap = await getDoc(commentRef);

  //     if (commentSnap.exists()) {
  //       setComments(commentSnap.data().comments);
  //     } else {
  //       setError("Be the first to comment...");
  //     }
  //   } catch (error: unknown) {
  //     if (typeof error === "string") setError(error);
  //     if (error instanceof Error) setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

    setLoading(true);
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
    setLoading(false);
    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return () => unsubscribe();
  }, [isOpen, title]);
  return (
    <>
      {children({ handleClick })}

      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent minH="400px" maxH="80vh" bg="gray.200">
            <ModalHeader bg="blue.600" color="white">
              {title}
            </ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody h="100%" overflowY="scroll">
              {loading ? (
                <Text>Fetching comments</Text>
              ) : error ? (
                <Text>{error}</Text>
              ) : (
                comments.map((comment, index) => (
                  <Comment key={index + comment} comment={comment} />
                ))
              )}
            </ModalBody>

            <ModalFooter px={0} pb={0}>
              <AddComment onSubmit={addComment} submitting={submitting} />
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default CommentsModal;
