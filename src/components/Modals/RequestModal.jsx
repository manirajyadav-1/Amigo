import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import usePostRequest from "../../hooks/usePostRequest";
import { useState } from "react";
import useShowToast from "../../hooks/useShowToast";


const RequestModal = ({ isOpen, onClose, post }) => {
  const { handlePostRequest, isRequesting } = usePostRequest();
  const showToast = useShowToast();
  const [formData, setIsFormData] = useState({
    name:"",
    phone:"",
    description:""
  })
 
  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    await handlePostRequest(post.id, formData);
    showToast("Success", "Request sent successfully", "success")
    setIsFormData( {name:"",
      phone:"",
      description:""})
  };

  

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
        <ModalHeader>Send Request</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmitRequest} style={{ marginTop: "2rem" }}>
            <Flex flexDirection={"column"} gap={4}>
              <Input placeholder="Name" size={"md"} value={formData.name} onChange={(e) => setIsFormData({...formData, name: e.target.value})} required/>
              <Input placeholder="Phone" size={"md"}  value={formData.phone} onChange={(e) => setIsFormData({...formData, phone: e.target.value})} required/>
              <Textarea placeholder="Hello, I am intrested in..." size={"md"}  value={formData.description} onChange={(e) => setIsFormData({...formData, description: e.target.value})} required/>
            </Flex>
            <Flex w={"full"} justifyContent={"flex-end"}>
              <Button
                type="submit"
                ml={"auto"}
                size={"sm"}
                my={4}
                isLoading={isRequesting}
              >
                Send
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RequestModal;
