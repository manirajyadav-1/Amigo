import { Box, Img, Text, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <Box position="relative" w="full" h="auto">
        <Img
          src="/houseBanner.jpg"
          alt="House Banner"
          w="100vw"
          h="100vh"
          objectFit="cover"
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          w="full"
          h="full"
          bgGradient="linear(to-r, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          p={8}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            alignItems={{ base: "flex-start", md: "center" }}
            justifyContent={{ base: "center", md: "space-between" }}
            w="full"
          >
            <Box maxW="lg" textAlign="left" mb={{ base: 6, md: 0 }}>
              <Text fontSize="6xl" fontWeight="bold" mb={6}>
                Find your next roommate!
              </Text>
              <Text fontSize="2xl" fontWeight={"bold"} opacity={0.8}>
                Looking for someone to share a place with? You&apos;ve come to
                the perfect place. Roomie is your true friend which helps you
                find your next roommate!
              </Text>
            </Box>
            <Link to="/auth">
              <Button
                colorScheme="blue"
                size="lg"
                mt={{ base: "0", md: "280" }}
                mr={{ base: "0", md: "100" }}
              >
                See all postings
              </Button>
            </Link>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
