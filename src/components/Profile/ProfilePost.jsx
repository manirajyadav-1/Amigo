import { Avatar, Box, Button, Divider, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md"
import Request from "../Request/Request";
import PostFooter from "../FeedPosts/PostFooter"
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../store/postStore";
import Caption from "../Request/Caption";
import { useBreakpointValue } from "@chakra-ui/react";


export const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
	const decrementPostsCount = useUserProfileStore((state) => state.deletePost);
  const showDeleteButton = useBreakpointValue({ base: true, md: false });

  const handleDeletePost = async () => {

    if(!window.confirm("Are you sure want to delete this post?")) return;
    if(isDeleting) return;

    try {
      const imageRef = ref(storage, `posts/${post.id}`);
			await deleteObject(imageRef);
			const userRef = doc(firestore, "users", authUser.uid);
			await deleteDoc(doc(firestore, "posts", post.id));

			await updateDoc(userRef, {
				posts: arrayRemove(post.id),
			});

			deletePost(post.id);
			decrementPostsCount(post.id);
			showToast("Success", "Post deleted successfully", "success");
    } catch(error) {
      showToast("Error",error.message,"error");
    }
    finally{
      setIsDeleting(false); 
    }
    
  }


  return (
    <>
      <Flex maxW={"100%"} direction={{ base: "column", md: "row" }} gap={4} alignItems={{ base: "center", md: "flex-start" }}>
        <Image src={post.imageURL} alt="profile post" h={"250px"} w={"330px"} objectFit={"cover"}/>
        <Box w={{ base: "100%", md: "calc(100% - 300px)" }} my={2} px={4} justifyContent={"center"}>
          <Text fontSize="xl" fontWeight="bold">{post.title}</Text>
          <Text fontSize="lg" color="gray.400">📍{post.location}</Text>
          <Text fontSize="lg" color="gray.400">{post.price}</Text>
          <Text fontSize="lg" color="gray.400">{post.description}</Text>
          <Flex gap={2}>
            <Button bgColor={"blueviolet"} onClick={onOpen}>View Requests</Button>
            {showDeleteButton && (
            <Button bgColor={"blueviolet"} onClick={handleDeletePost} isLoading={isDeleting}>Delete Post</Button>
          )}
          </Flex>
        </Box>
        {authUser?.uid === userProfile.uid &&  !showDeleteButton && (
          <Button 
            size={"sm"} 
            bg={"transparent"} 
            _hover={{ bg: "whiteAlpha.300", color: "red.600" }} 
            borderRadius={4} 
            p={1} 
            onClick={handleDeletePost} 
            isLoading={isDeleting}
            alignSelf={{ base: "center", md: "flex-start" }}
          >
            <MdDelete size={20} cursor={"pointer"} />
          </Button>
        )}
      </Flex>




    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{base:"md",md:"lg"}}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex gap={4} w={{base:"90%",sm:"70%",md:"full"}} mx={"auto"} maxH={"90vh"} minH={"50vh"}>
                
                <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                  <Flex alignItems={"center"} gap={2}>
                    <Text fontSize={"lg"} fontWeight={"bold"}>Received Requests</Text>
                    <Box color={"gray.500"}>• Total {post.requests.length} received request</Box>
                  </Flex>
                  <Divider my={4} bg={"gray.500"}/>
                  {/* REQUEST */}
                  {post.requests.map((request) => (
                    <Request key={request.id} request={request}/>
                  ))}
                </VStack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ProfilePost;
