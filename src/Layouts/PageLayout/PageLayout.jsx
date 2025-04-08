import { Box, Flex, Spinner } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);

  const isAuthPage = pathname === "/auth";
  const showSidebar = !isAuthPage && user;
  const showNavbarPlaceholder = !user && !loading && !isAuthPage;

  if (loading && !user) {
    return <PageLayoutSpinner />;
  }

  return (
    <Flex flexDir={showNavbarPlaceholder ? "column" : "row"}>
      {/* Sidebar */}
      {showSidebar && (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      )}

      {/* Page Content */}
      <Box
        flex={1}
        w={{
          base: showSidebar ? "calc(100% - 70px)" : "100%",
          md: showSidebar ? "calc(100% - 240px)" : "100%",
        }}
        mx="auto"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;

const PageLayoutSpinner = () => (
  <Flex
    flexDir="column"
    h="100vh"
    alignItems="center"
    justifyContent="center"
  >
    <Spinner size="xl" />
  </Flex>
);