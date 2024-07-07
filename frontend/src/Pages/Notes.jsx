import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  InputGroup,
  Input,
  Button,
  SimpleGrid,
  Text,
  Textarea,
  Spinner,
  FormLabel,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  notescreate,
  notesdelete,
  notesget,
  notesupdate,
} from "../Redux/NotesData/action";
import Cookies from "js-cookie";
import {
  NOTES_CREATE_SUCCESS,
  NOTES_DELETE_SUCCESS,
  NOTES_FAIL,
  NOTES_UPDATE_SUCCESS,
} from "../Redux/actionTypes";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export function Notes() {
  const notesdata = useSelector((store) => store.notesReducer.data);
  const loading = useSelector((store) => store.notesReducer.loading);
  const create_loading = useSelector(
    (store) => store.notesReducer.create_loading
  );
  const update_loading = useSelector(
    (store) => store.notesReducer.update_loading
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const toast = useToast();
  let token = Cookies.get("tokens");
  const [formdata, setFormdata] = useState({ title: "", body: "" });
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [updateID, setUpdateID] = useState(0);

  useEffect(() => {
    dispatch(notesget(token));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(notescreate(formdata, token))
      .then((res) => {
        dispatch({ type: NOTES_CREATE_SUCCESS });
        toast({
          title: `${res.data.msg}`,
          position: "bottom",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        dispatch(notesget(token));
        setFormdata({ title: "", body: "" });
      })
      .catch((err) => {
        dispatch({ type: NOTES_FAIL });
        toast({
          title: `${err.response.data.msg}`,
          position: "bottom",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleDelete = (id) => {
    dispatch(notesdelete(id, token))
      .then((res) => {
        dispatch({ type: NOTES_DELETE_SUCCESS });
        toast({
          title: `${res.data.msg}`,
          position: "bottom",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        dispatch(notesget(token));
      })
      .catch((err) => {
        dispatch({ type: NOTES_FAIL });
        toast({
          title: `${err.response.data.msg}`,
          position: "bottom",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const openModaltoUpdate = (id) => {
    let note = notesdata.find((item) => item._id === id);
    setFirst(note.title);
    setSecond(note.body);
    setUpdateID(id);
    onOpen();
  };

  const handleUpdate = (updateID) => {
    let data = {
      title: first,
      body: second,
    };
    dispatch(notesupdate(data, updateID, token))
      .then((res) => {
        dispatch({ type: NOTES_UPDATE_SUCCESS });
        onClose();
        toast({
          title: `${res.data.msg}`,
          position: "bottom",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        dispatch(notesget(token));
      })
      .catch((err) => {
        dispatch({ type: NOTES_FAIL });
        toast({
          title:
            `${err.response.data.msg}` || `Something went Wrong, Try again!!`,
          position: "bottom",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex w="100%" display="block" mt="90px">
      <Text
        textAlign="center"
        fontWeight="bold"
        fontSize="24px"
        textShadow="1px 1px #fff"
        fontFamily="forte"
        mb="20px"
      ></Text>

      {loading ? (
        <Box w="50px" m="auto" mt="150px" mb="150px">
          <Spinner thickness="4px" speed="0.65s" color="white" size="xl" />
        </Box>
      ) : (
        <SimpleGrid
          w="90%"
          m="auto"
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
          color="black"
          gap="20px"
        >
          <Box p="20px" borderRadius="10px" border="1px solid #4a5057">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <InputGroup>
                  <Input
                    value={formdata.title}
                    onChange={(e) =>
                      setFormdata({ ...formdata, title: e.target.value })
                    }
                    border="1px solid #4a5057"
                    type="text"
                    placeholder="Enter Your Title"
                    required
                    color={"white"}
                  />
                </InputGroup>
                <br />

                <InputGroup>
                  <Textarea
                    value={formdata.body}
                    onChange={(e) =>
                      setFormdata({ ...formdata, body: e.target.value })
                    }
                    border="1px solid #4a5057"
                    type="text"
                    placeholder="Enter Your Notes"
                    required
                    color={"white"}
                  />
                </InputGroup>
                <br />

                {create_loading ? (
                  <Button
                    _hover={{ bg: "black" }}
                    w="100%"
                    isLoading
                    loadingText="Creating"
                    colorScheme="#6f94ec"
                    variant="solid"
                    bg="black"
                  ></Button>
                ) : (
                  <Button
                    style={{ width: "100%" }}
                    className="create"
                    color="white"
                    bg="#618df2"
                    type="submit"
                    _hover={{ bg: "#456ac1" }}
                  >
                    Add Note
                  </Button>
                )}
              </FormControl>
            </form>
          </Box>

          {notesdata?.map((item, index) => (
            <Box
              className="border"
              p="20px"
              borderRadius="10px"
              border="1px solid #4a5057"
              key={index}
            >
              <Text
                bg="none"
                border="none"
                outline="none"
                focusBorderColor="transparent"
                textAlign={"center"}
                fontWeight={"600"}
                color={"white"}
              >
                {item.title}
              </Text>
              <br />
              <Text
                bg="none"
                border="none"
                outline="none"
                focusBorderColor="transparent"
                color={"white"}
              >
                {item.body}
              </Text>
              <br />

              <Flex w="97%" m="auto" justifyContent="space-between">
                <Button
                  onClick={() => openModaltoUpdate(item._id)}
                  className="button"
                  bg="#1ef67f"
                  _hover={{ bg: "#2fa767" }}
                >
                  UPDATE
                </Button>
                <Button
                  onClick={() => handleDelete(item._id)}
                  className="button"
                  bg="red"
                  _hover={{ bg: "#a72f43" }}
                  color="white"
                >
                  DELETE
                </Button>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="xs" border="1px solid red">
        <ModalOverlay />
        <ModalContent border={"1px solid #4a5057"} borderRadius={"5px"}>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color={"white"}>Title</FormLabel>
              <Input
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                required
                color={"white"}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={"white"}>Notes</FormLabel>
              <Textarea
                value={second}
                onChange={(e) => setSecond(e.target.value)}
                required
                color={"white"}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {update_loading ? (
              <Button w="60%" colorScheme="blue" isLoading></Button>
            ) : (
              <Button
                type="submit"
                onClick={() => handleUpdate(updateID)}
                colorScheme="blue"
                mr={3}
              >
                Confrim Update
              </Button>
            )}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
