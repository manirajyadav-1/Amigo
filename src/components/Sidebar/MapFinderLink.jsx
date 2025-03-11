import { Link as RouterLink } from "react-router-dom";
import { MapLogo } from "../../assets/constants";
import { Box, Link } from "@chakra-ui/react";

const MapFinderLink = () => {
  return (
    <Link
      display={"flex"}
      to={"/mapfinder"}
      as={RouterLink}
      alignItems={"center"}
      gap={4}
      _hover={{ bg: "whiteAlpha.400" }}
      borderRadius={6}
      p={2}
      w={{ base: 10, md: "full" }}
      justifyContent={{ base: "center", md: "flex-start" }}
    >
      <MapLogo />
      <Box display={{ base: "none", md: "block" }}>MapFinder</Box>
    </Link>
  );
};

export default MapFinderLink;
