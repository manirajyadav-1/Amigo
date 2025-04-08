import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";

import Request from "../Request/Request";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import usePostStore from "../../store/postStore";

const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authUser = useAuthStore((state) => state.user);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const showToast = useShowToast();

  const [isDeleting, setIsDeleting] = useState(false);
  const deletePostFromStore = usePostStore((state) => state.deletePost);
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);
  const showDeleteButton = useBreakpointValue({ base: true, md: false });

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);

      const postRef = doc(firestore, "posts", post.id);
      const userRef = doc(firestore, "users", authUser.uid);

      await deleteDoc(postRef);
      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });

      deletePostFromStore(post.id);
      decrementPostsCount(post.id);
      showToast("Success", "Post deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const canShowDelete = authUser?.uid === userProfile?.uid;

  return (
    <>
      <Flex
        maxW="100%"
        direction={{ base: "column", md: "row" }}
        gap={4}
        alignItems={{ base: "center", md: "flex-start" }}
        p={4}
        borderRadius="lg"
        bg="gray.800"
        boxShadow="md"
      >
        <Image
          src={post.imageURL}
          alt={post.title}
          h="250px"
          w="330px"
          objectFit="cover"
          borderRadius="md"
        />

        <Box w={{ base: "100%", md: "calc(100% - 300px)" }} px={4}>
          <Text fontSize="xl" fontWeight="bold" mb={1}>
            {post.title}
          </Text>
          <Text fontSize="lg" color="gray.400" mb={1}>
            📍 {post.location}
          </Text>
          <Text fontSize="lg" color="gray.400" mb={1}>
            💸 {post.price}
          </Text>
          <Text fontSize="md" color="gray.300" mb={4}>
            {post.description}
          </Text>

          <Flex gap={3} flexWrap="wrap">
            <Button colorScheme="purple" onClick={onOpen}>
              View Requests
            </Button>
            {showDeleteButton && (
              <Button
                colorScheme="red"
                onClick={handleDeletePost}
                isLoading={isDeleting}
              >
                Delete Post
              </Button>
            )}
          </Flex>
        </Box>

        {canShowDelete && !showDeleteButton && (
          <Button
            size="sm"
            bg="transparent"
            _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
            borderRadius={4}
            p={1}
            onClick={handleDeletePost}
            isLoading={isDeleting}
            alignSelf={{ base: "center", md: "flex-start" }}
          >
            <MdDelete size={20} cursor="pointer" />
          </Button>
        )}
      </Flex>

      {/* Modal for requests */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ base: "md", md: "lg" }}
      >
        <ModalOverlay />
        <ModalContent bg="black" maxH="90vh" overflowY="auto">
          <ModalCloseButton />
          <ModalBody pb={5}>
            <Flex direction="column" gap={4} w="full">
              <Flex align="center" justify="space-between" wrap="wrap">
                <Text fontSize="lg" fontWeight="bold">
                  Received Requests
                </Text>
                <Text color="gray.400" fontSize="sm">
                  • Total {post.requests?.length || 0} request
                  {post.requests?.length === 1 ? "" : "s"}
                </Text>
              </Flex>

              <Divider my={2} bg="gray.600" />

              <VStack align="stretch" spacing={4} maxH="350px" overflowY="auto">
                {post.requests?.length ? (
                  post.requests.map((request) => (
                    <Request key={request.id} request={request} />
                  ))
                ) : (
                  <Text color="gray.500" textAlign="center">
                    No requests received yet.
                  </Text>
                )}
              </VStack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
