import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

const usePostRequest = () => {
  const [isRequesting, setIsRequesting] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const addRequest = usePostStore((state) => state.addRequest);

  const handlePostRequest = async (postId, request) => {
    if (isRequesting) return;
    if (!authUser)
      return showToast("Error", "You must be logged in to send request", "error");
    setIsRequesting(true);
    const newRequest = {
      request,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId,
    };
    try {
      await updateDoc(doc(firestore, "posts", postId), {
        requests: arrayUnion(newRequest),
      });
      addRequest(postId, newRequest);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsRequesting(false);
    }
  };

  return { isRequesting, handlePostRequest };
};

export default usePostRequest;
