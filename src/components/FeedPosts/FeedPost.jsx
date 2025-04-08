import { Box, Image, Text } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import React from "react";

const FeedPost = ({ post }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);

  return (
    <Box
      border="1px solid gray"
      borderRadius="10px"
      overflow="hidden"
      shadow="md"
      maxW="300px"
      w="full"
      h="450px"
      display="flex"
      flexDirection="column"
      p={4}
    >
      <PostHeader post={post} creatorProfile={userProfile} />
      <Image
        src={post.imageURL}
        alt="Feed Post Img"
        h="200px"
        w="full"
        objectFit="cover"
        loading="lazy" 
      />
      <Box mt={3}>
        <Text fontSize="xl" fontWeight="bold">{post.title}</Text>
        <Text fontSize="md" color="gray.500">📍 {post.location}</Text>
        <Text fontSize="md" color="gray.500">💰 {post.price}</Text>
      </Box>
      <PostFooter post={post} creatorProfile={userProfile} />
    </Box>
  );
};


export default React.memo(FeedPost);