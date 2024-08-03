import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { timeAgo } from "../../utils/timeAgo";
import DetailsModal from "../Modals/DetailsModal";
import RequestModal from "../Modals/RequestModal";

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  const openDetailsModal = () => {
    setIsDetailsOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsOpen(false);
  };

  const openRequestModal = () => {
    setIsRequestOpen(true);
  };

  const closeRequestModal = () => {
    setIsRequestOpen(false);
  };

  return (
    <Box mb={10} marginTop={"auto"}>
      {!isProfilePage && (
        <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mt={1}>
          <Button
            cursor={"pointer"}
            fontSize={18}
            bgColor={"blueviolet"}
            onClick={openDetailsModal}
          >
            View details
          </Button>
          <Button
            cursor={"pointer"}
            fontSize={18}
            bgColor={"blueviolet"}
            onClick={openRequestModal}
          >
            Send request
          </Button>
        </Flex>
      )}

      {isDetailsOpen && (
        <DetailsModal
          isOpen={isDetailsOpen}
          onClose={closeDetailsModal}
          post={post}
          creatorProfile={creatorProfile}
        />
      )}

      {isRequestOpen && (
        <RequestModal isOpen={isRequestOpen} onClose={closeRequestModal} post={post} />
      )}

      {isProfilePage && (
        <Text fontSize="12" color={"gray"}>
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}
    </Box>
  );
};

export default PostFooter;
