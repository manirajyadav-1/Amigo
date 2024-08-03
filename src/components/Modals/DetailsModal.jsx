import {
  Avatar,
  Box,
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
} from "@chakra-ui/react";
import { timeAgo } from "../../utils/timeAgo";

const DetailsModel = ({ post, isOpen, onClose, creatorProfile }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      size={{ base: "lg", md: "xl" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody bg={"black"} pb={5}>
          <Flex alignItems={"center"} gap={4}>
            <Avatar
              src={creatorProfile.profilePicURL}
              alt={"Profile Pic"}
              size={"sm"}
            />
            <Text fontSize={"bold"} fontWeight={"bold"}>
              {creatorProfile.username}
            </Text>
            <Box color={"gray.500"}>• {timeAgo(post.createdAt)}</Box>
          </Flex>
          <Divider my={4} bg={"gray.500"} />
          <VStack alignItems={"center"} overflowY={"auto"}>
            <Image
              src={post.imageURL}
              alt={"Post Image"}
              maxW={"100%"}
              maxH={"50%"}
            />
            <Text fontSize="xl" fontWeight="bold">
              {post.title}
            </Text>
            <Text fontSize="lg" color="gray.400">
              📍{post.location}
            </Text>
            <Flex gap={2}>
              <Text fontSize="lg" color="gray.400">
                Price:
              </Text>
              <Text fontSize="lg" color="gray.400">
                {post.price}
              </Text>
            </Flex>
            <Flex gap={2}>
              <Text fontSize="lg" color="gray.400">
                High Preferences:
              </Text>
              {post.preferences &&
                post.preferences.map((item, idx) => (
                  <Text
                    key={idx}
                    fontSize="lg"
                    color="gray.800"
                    backgroundColor={"whitesmoke"}
                    borderRadius={2}
                  >
                    {item}
                  </Text>
                ))}
            </Flex>
            <Flex gap={2}>
              <Text fontSize="lg" color="gray.400">
                Description:
              </Text>
              <Text fontSize="lg" color="gray.400">
                {post.description}
              </Text>
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DetailsModel;
