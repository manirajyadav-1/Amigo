import { Flex, Text, Tooltip } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ icon, label, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Tooltip
      hasArrow
      label={label}
      placement='right'
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Flex
        as={Link}
        to={to}
        alignItems={"center"}
        gap={4}
        borderRadius={6}
        p={2}
        bg={isActive ? "blue.100" : "transparent"}
        _hover={{ bg: isActive ? "blue.200" : "whiteAlpha.400" }}
        color={isActive ? "blue.600" : "black"}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        {icon}
        <Text display={{ base: "none", md: "block" }}>{label}</Text>
      </Flex>
    </Tooltip>
  );
};

export default SidebarItem;