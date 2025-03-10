import { Container } from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";


const Navbar = () => {
  const authUser = useAuthStore((state) => state.user);

  if (!authUser) return null;

  return (
    <Container
      maxW={"container.xl"}
      borderBottom={"1px solid"}
      borderColor={"black"}
      py={{ base: "0.5", md: "5" }}
      position={"fixed"}
      zIndex={1}
      overflow={"hidden"}
      bgColor={"gray.200"}
    >
    </Container>
  );
};

export default Navbar;
