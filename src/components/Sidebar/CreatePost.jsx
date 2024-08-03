import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { IoCreateOutline } from "react-icons/io5";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formValues, setFormValues] = useState({
    title: "",
    price: "",
    location: "",
    preferences: [],
    description: "",
  });
  const imageRef = useRef(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const showToast = useShowToast();
  const { isLoading, handleCreatePost } = useCreatePost();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (values) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      preferences: values,
    }));
  };

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, formValues);
      onClose();
      setFormValues("");
      setSelectedFile(null);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Create"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <IoCreateOutline size={30}/>
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent bg={"black"} border={"1px solid gray"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} columnGap={10}>
            <Box>
              <Text>Title</Text>
              <Input
                type="text"
                placeholder="Try something like: Seeking Roommate or 2 bed room place."
                name="title"
                value={formValues.title}
                onChange={handleChange}
              />
            </Box>

            <Flex gap={16}>
              <Box>
                <Text>Price</Text>
                <Select
                  placeholder="Select option"
                  name="price"
                  value={formValues.price}
                  onChange={handleChange}
                >
                  <option value="₹5000-₹10000">₹5000-₹10000</option>
                  <option value="₹10000-₹15000">₹10000-₹15000</option>
                  <option value="₹15000-₹20000">₹15000-₹20000</option>
                  <option value="₹20000-₹30000">₹20000-₹30000</option>
                </Select>
              </Box>
              <Box>
                <Text>Location</Text>
                <Select
                  placeholder="Select option"
                  name="location"
                  value={formValues.location}
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
              </Box>
            </Flex>

            <Flex gap={4}>
              <Text>Preferences:</Text>
              <CheckboxGroup
                colorScheme="blue"
                value={formValues.preferences}
                onChange={handleCheckboxChange}
              >
                <VStack>
                  <Stack spacing={[1, 5]} direction={["column", "row"]}>
                    <Checkbox value="Male">Male</Checkbox>
                    <Checkbox value="Female">Female</Checkbox>
                    <Checkbox value="Professional">Professional</Checkbox>
                    <Checkbox value="Elderly">Elderly</Checkbox>
                  </Stack>
                  <Stack spacing={[1, 2]} direction={["column", "row"]}>
                    <Checkbox value="No Smoking">No Smoking</Checkbox>
                    <Checkbox value="No Drinking">No Drinking</Checkbox>
                    <Checkbox value="No Partying">No Partying</Checkbox>
                    <Checkbox value="No Pets">No Pets</Checkbox>
                  </Stack>
                </VStack>
              </CheckboxGroup>
            </Flex>

            <Box>
              <Text>Description</Text>
              <Textarea
                placeholder={`Try Something Like:\n\nUnit: One bedroom for rent in a 2 bedroom basement apartment in Koramangla, Bangalore, starting November 1, 2020.\nPrice: ₹1150 (includes internet + utilities).\nFirst and last month’s rent required.\nRent Control: Unit was used for residential purposes prior to Nov 15 2024.\nLocation: Jayangara, Bangalore\nRelationship to unit: Current tenant seeking roommate.\nLease Term: 12 months, preferably`}
                rows={10}
                name="description"
                value={formValues.description}
                onChange={handleChange}
              />
            </Box>
            <Input
              type="file"
              hidden
              ref={imageRef}
              onChange={handleImageChange}
            />

            <BsFillImageFill
              onClick={() => imageRef.current.click()}
              style={{
                marginTop: "15px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              size={16}
            />
            {selectedFile && (
              <Flex
                mt={5}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}
              >
                <Image src={selectedFile} alt="Selected img" />
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => {
                    setSelectedFile(null);
                  }}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;

function useCreatePost() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
  const addPost = useUserProfileStore((state) => state.addPost);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const { pathname } = useLocation();

  const handleCreatePost = async (selectedFile, formValues) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error("Please select an image");
    setIsLoading(true);
    const newPost = {
      title: formValues.title,
      price: formValues.price,
      location: formValues.location,
      preferences: formValues.preferences,
      description: formValues.description,
      likes: [],
      requests: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      const userDocRef = doc(firestore, "users", authUser.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;

      if (userProfile.uid === authUser.uid)
        createPost({ ...newPost, id: postDocRef.id });

      if (pathname !== "/" && userProfile.uid === authUser.uid)
        addPost({ ...newPost, id: postDocRef.id });

      showToast("Success", "Post created successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
}
