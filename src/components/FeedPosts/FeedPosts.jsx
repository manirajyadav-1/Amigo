import {
  Box,
  Button,
  Container,
  Flex,
  Select,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import useAuthStore from "../../store/authStore";

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();
  const authUser = useAuthStore((state) => state.user);

  const [formData, setFormData] = useState({
    location: "",
    preference: "",
    price: "",
  });

  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    setFilteredPosts(posts.filter(post => authUser.uid !== post.createdBy));
  }, [posts, authUser]);

  const handleSearch = () => {
    if (!authUser) return;

    const newFilteredPosts = posts.filter((post) => {
      if (authUser.uid === post.createdBy) return false;
      if (formData.location && post.location !== formData.location) return false;
      if (formData.preference && !post.preferences.includes(formData.preference)) return false;
      if (formData.price && post.price !== formData.price) return false;
      return true;
    });
    setFilteredPosts(newFilteredPosts);
    setFormData({ location: "", preference: "", price: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxW="container.xl" py={10}>
      {/* Filters */}
      <Flex borderRadius={8} gap={2} justifyContent="center" alignItems="center" wrap="wrap">
        <Select placeholder="Location" h="50px" w={{ base: "full", md: "220px" }} name="location" value={formData.location} onChange={handleChange}>
          <option value="Koramangala">Koramangala</option>
          <option value="Jayanagar">Jayanagar</option>
          <option value="Lalbagh">Lalbagh</option>
          <option value="Electronic City">Electronic City</option>
          <option value="Kaggalipura">Kaggalipura</option>
          <option value="Whitefield">Whitefield</option>
          <option value="Yesvanthpur">Yesvanthpur</option>
          <option value="Indiranagar">Indiranagar</option>
        </Select>

        <Select placeholder="Preference" h="50px" w={{ base: "full", md: "220px" }} name="preference" value={formData.preference} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Professional">Professional</option>
          <option value="Elderly">Elderly</option>
          <option value="No Smoking">No Smoking</option>
          <option value="No Drinking">No Drinking</option>
          <option value="No Partying">No Partying</option>
          <option value="No Pets">No Pets</option>
        </Select>

        <Select placeholder="Price" h="50px" w={{ base: "full", md: "220px" }} name="price" value={formData.price} onChange={handleChange}>
          <option value="₹5000-₹10000">₹5000-₹10000</option>
          <option value="₹10000-₹15000">₹10000-₹15000</option>
          <option value="₹15000-₹20000">₹15000-₹20000</option>
          <option value="₹20000-₹30000">₹20000-₹30000</option>
        </Select>

        <Button bgColor="blueviolet" color="white" h="50px" w={{ base: "full", md: "220px" }} onClick={handleSearch}>
          Search
        </Button>
      </Flex>

      {/* Posts Grid */}
      {isLoading ? (
        [0, 1, 2].map((_, idx) => (
          <Flex key={idx} gap={4} alignItems="flex-start" mb={10}>
            <Flex gap="2">
              <SkeletonCircle size="10" />
              <VStack gap={2} alignItems="flex-start">
                <Skeleton height="10px" w="200px" />
                <Skeleton height="10px" w="200px" />
              </VStack>
            </Flex>
            <Skeleton w="full">
              <Box h="400px">contents wrapped</Box>
            </Skeleton>
          </Flex>
        ))
      ) : filteredPosts.length > 0 ? (
        <Wrap spacing={6} justify="center" mt={6} align="stretch">
          {filteredPosts.map((post) => (
            <WrapItem key={post.id} w="300px">
              <FeedPost post={post} />
            </WrapItem>
          ))}
        </Wrap>
      ) : (
        <Text fontSize="md" color="red.400" my={18} textAlign="center">
          No posts found.
        </Text>
      )}
    </Container>
  );
};

export default FeedPosts;
