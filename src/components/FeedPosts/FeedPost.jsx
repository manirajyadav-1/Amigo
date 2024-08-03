import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";


const FeedPost = ({ post }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);

  return (
    <Container maxW={"100%"} width={"100%"} paddingX={4}>
      <PostHeader post={post} creatorProfile={userProfile} />
      <Flex flexDirection={{ base: "column", md: "column" }} justify="space-between" gap={4}>
        <Box my={2} borderRadius={4} overflow={"hidden"}>
          <Image src={post.imageURL} h={"70%"} w={"60%"} alt={"Feed Post Img"} loading="lazy" />
        </Box>
        <Box maxW={"100%"} my={2} gap={4}>
            <Text fontSize="xl" fontWeight="bold">{post.title}</Text>
            <Text fontSize="lg" color="gray.400">📍{post.location}</Text>
            <Text fontSize="lg" color="gray.400">{post.price}</Text>
        </Box>
      </Flex>
      <PostFooter post={post} creatorProfile={userProfile} />
    </Container>
  );
};

export default FeedPost;
