import { Box, VStack, Flex, Text } from "@chakra-ui/react";
import { useState, lazy, Suspense } from "react";

const Login = lazy(() => import("./Login"));
const Signup = lazy(() => import("./Signup"));
const GoogleAuth = lazy(() => import("./GoogleAuth"));

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box border="1px solid gray" borderRadius={8} padding={8} w="full" maxW="500px" mx="auto" mt={8}>
        <VStack>
          <Flex justifyContent={"center"} alignItems={"center"} flexDirection={"column"} mb={"5px"}>
            <Text fontSize={"20px"} opacity={0.8}>Welcome</Text>
            <Text fontSize={"30px"} cursor={"pointer"} opacity={0.9} fontWeight={"bold"}>Amigo</Text>
          </Flex>

          <Suspense fallback={<Text>Loading...</Text>}>
            {isLogin ? <Login /> : <Signup />}
          </Suspense>

          {/* ----- OR Text -----*/}
          <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"black"}>OR</Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>

          {/* Lazy Load GoogleAuth */}
          <Suspense fallback={<Text>Loading Google Auth...</Text>}>
            <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
          </Suspense>
        </VStack>
      </Box>

      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box
            onClick={() => setIsLogin(!isLogin)}
            color={"blue.500"}
            cursor={"pointer"}
          >
            {isLogin ? "Sign Up" : "Log in"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;