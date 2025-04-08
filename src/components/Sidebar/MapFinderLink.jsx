import { Link as RouterLink } from "react-router-dom";
import { MapLogo } from "../../assets/constants";
import { Box, Link, Tooltip } from "@chakra-ui/react";

const MapFinderLink = () => {
  return (
    <Tooltip label="Map Finder" placement="right" hasArrow openDelay={400} display={{ base: "block", md: "none" }}>
      <Link
        as={RouterLink}
        to="/mapfinder"
        display="flex"
        alignItems="center"
        gap={4}
        _hover={{ bg: "whiteAlpha.400", transform: "scale(1.03)" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
        transition="all 0.2s ease-in-out"
        aria-label="Map Finder"
      >
        <MapLogo />
        <Box display={{ base: "none", md: "block" }}>MapFinder</Box>
      </Link>
    </Tooltip>
  );
};

export default MapFinderLink;