import { Box } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import Navbar from "../../components/Navbar/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Box flex={2} py={10}>
        <FeedPosts />
      </Box>
    </>
  );
};

export default HomePage;
