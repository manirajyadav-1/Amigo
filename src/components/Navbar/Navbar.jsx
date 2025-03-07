import { Container } from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";


const Navbar = () => {
  const authUser = useAuthStore((state) => state.user);

  if (!authUser) return null;

  return (
    <Container
      maxW={"container.xl"}
      borderBottom={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={{ base: "0.5", md: "5" }}
      position={"fixed"}
      zIndex={1}
      overflow={"hidden"}
      bgColor={"black"}
    >
    </Container>
  );
};

export default Navbar;
