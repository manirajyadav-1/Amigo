import { Container, Box, Flex } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import Navbar from "../../components/Navbar/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Container maxW={"container.lg"}>
      <Flex gap={20}>
        <Box flex={2} py={10}>
          <FeedPosts />
        </Box>
        <Box
          flex={3}
          mr={20}
          display={{ base: "none", lg: "block" }}
          maxW={"300px"}
        >
        </Box>
      </Flex>
    </Container>
    </>
  );
};

export default HomePage;
