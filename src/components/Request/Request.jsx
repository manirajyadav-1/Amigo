import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

const Request = ({ request }) => {
  console.log(request);
  const { userProfile, isLoading } = useGetUserProfileById(request.createdBy);

  if (isLoading) return <RequestSkeleton />;
  return (
    <Flex gap={4}>
      <Link to={`/${userProfile.username}`}>
        <Avatar src={userProfile.profilePicURL} size={"sm"} />
      </Link>
        <Flex gap={2}>
          <Link to={`/${userProfile.username}`}>
            <Text fontWeight={"bold"} fontSize={12}>
              {userProfile.username}
            </Text>
            <Text fontSize={12} color={"gray"}>
              {timeAgo(request.createdAt)}
            </Text>
          </Link>
          <Flex direction={"column"}>
            <Text fontSize={14} color={"gray"}>{request.request.description}</Text>
            <Text fontSize={14} color={"gray"}>📞 {request.request.phone}</Text>
          </Flex>
        </Flex>
    </Flex>
  );
};

export default Request;

const RequestSkeleton = () => {
  return (
    <Flex gap={4} w={"full"} alignItems={"center"}>
      <SkeletonCircle h={10} w="10" />
      <Flex gap={1} flexDir={"column"}>
        <Skeleton height={2} width={100} />
        <Skeleton height={2} width={50} />
      </Flex>
    </Flex>
  );
};
