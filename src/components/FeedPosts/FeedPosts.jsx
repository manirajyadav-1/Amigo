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
  }, [posts, authUser.uid]);

  const handleSearch = () => {
    const newFilteredPosts = posts.filter((post) => {
      if (authUser.uid === post.createdBy) return false;
      if (formData.location && post.location !== formData.location) return false;
      if (formData.preference && !post.preferences.includes(formData.preference)) return false;
      if (formData.price && post.price !== formData.price) return false;
      return true;
    });
    setFilteredPosts(newFilteredPosts);
    setFormData({location:"",preference:"",price:""})
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxW={"container.2xl"} py={12}>
      <Flex borderRadius={8} gap={0.5} justifyContent={"center"} alignItems={"center"}>
        <Select
          placeholder="Location"
          h={{base:"none", md:"60px"}}
          w={{base:"xsm", md:"220px"}}
          name="location"
          value={formData.location}
          onChange={handleChange}
        >
          <option value="Koramangala">Koramangala</option>
          <option value="Jayanagar">Jayanagar</option>
          <option value="Lalbagh">Lalbagh</option>
          <option value="Electronic City">Electronic City</option>
          <option value="Kaggalipura">Kaggalipura</option>
          <option value="Whitefield">Whitefield</option>
          <option value="Yesvanthpur">Yesvanthpur</option>
          <option value="Indiranagar">Indiranagar</option>
        </Select>
        <Select
          placeholder="Preference"
          h={{base:"none", md:"60px"}}
          w={{base:"xsm", md:"220px"}}
          name="preference"
          value={formData.preference}
          onChange={handleChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Professional">Professional</option>
          <option value="Elderly">Elderly</option>
          <option value="No Smoking">No Smoking</option>
          <option value="No Drinking">No Drinking</option>
          <option value="No Partying">No Partying</option>
          <option value="No Pets">No Pets</option>
        </Select>
        <Select
          placeholder="Price"
          h={{base:"none", md:"60px"}}
          w={{base:"xsm", md:"220px"}}
          name="price"
          value={formData.price}
          onChange={handleChange}
        >
          <option value="₹5000-₹10000">₹5000-₹10000</option>
          <option value="₹10000-₹15000">₹10000-₹15000</option>
          <option value="₹15000-₹20000">₹15000-₹20000</option>
          <option value="₹20000-₹30000">₹20000-₹30000</option>
        </Select>
        <Button bgColor={"blueviolet"} h={{base:"none", md:"60px"}}
          w={{base:"xsm", md:"220px"}} onClick={handleSearch}>
          Search
        </Button>
      </Flex>
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap="2">
              <SkeletonCircle size="10" />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height="10px" w={"200px"} />
                <Skeleton height="10px" w={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"400px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading &&
        filteredPosts.length > 0 &&
        filteredPosts.map((post) => <FeedPost key={post.id} post={post} />)}

      {!isLoading && filteredPosts.length === 0 && (
        <Text fontSize={"md"} color={"red.400"} my={18}>
          Dayuum. No any post found.
        </Text>
      )}
    </Container>
  );
};

export default FeedPosts;
