import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../configs/firebase";

type TProps = {
  title: string;
  isOpen: boolean;
};
function useComments({ title, isOpen }: TProps) {
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
  return {
    error,
    comments,
    submitting,
    addComment,
  };
}

export default useComments;
