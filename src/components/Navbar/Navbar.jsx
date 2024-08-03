import { Avatar, Button, Container, Flex, Text } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  const authUser = useAuthStore((state) => state.user);

  if (!authUser) return null;

  return (
    <Container
      maxW={"container.xl"}
      borderBottom={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={{base:"0.5", md:"2"}}
      position={"fixed"}
      zIndex={1}
      overflow={"hidden"}
      bgColor={"black"}
    >
      <Flex
        justifyContent={"flex-end"}
        alignItems={"center"}
        gap={4}
        mr={{ base: "20", md: "32" }}
      >
        <Flex alignItems={"center"} gap={2}>
          <Link to={`${authUser.username}`}>
            <Avatar size={"lg"} src={authUser.profilePicURL} />
          </Link>
          <Link to={`${authUser.username}`}>
            <Text fontSize={12} fontWeight={"bold"}>
              {authUser.username}
            </Text>
          </Link>
        </Flex>
        <Button
          size={"sm"}
          bg={"white"}
          color={"black"}
          _hover={{ bg: "whiteAlpha.800" }}
          fontSize={14}
          fontWeight={"medium"}
          onClick={handleLogout}
          isLoading={isLoggingOut}
          cursor={"pointer"}
          display={{ base: "none", md: "block" }}
        >
          Log out
        </Button>
      </Flex>
    </Container>
  );
};

export default Navbar;
