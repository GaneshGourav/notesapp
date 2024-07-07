import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usersignup } from "../Redux/UserData/action";
import { USER_FAIL, USER_SIGNUP_SUCCESS } from "../Redux/actionTypes";
import Cookies from "js-cookie";
import logo from "../assets/Simplenote_logo.svg";

export function Signup() {
  const [formdata, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  let token = Cookies.get("tokens");
  let username = Cookies.get("username");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.userReducer.loading);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
        formdata.password
      )
    ) {
      setError(true);
      return;
    }
    setError(false);
    dispatch(usersignup(formdata))
      .then((res) => {
        dispatch({ type: USER_SIGNUP_SUCCESS });
        setFormData({ username: "", email: "", password: "" });
        toast({
          title: `${res.data.msg}`,
          position: "bottom",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        dispatch({ type: USER_FAIL });
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

  if (username || token) {
    return <Navigate to="/" />;
  }

  return (
    <Flex mt="110px">
      <form
        onSubmit={handleSubmit}
        style={{
          width: "350px",
          margin: "auto",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <Flex justifyContent={"center"} alignItems={"center"} gap={"10px"}>
          <Image src={logo} w={"25px"} gap={"5px"} />
          <Text
            color="white"
            textShadow="1px 1px #000"
            fontWeight="bold"
            fontSize="25px"
            letterSpacing="1px"
            textAlign="center"
          >
            Sign Up
          </Text>
        </Flex>
        <br />
        <FormControl isRequired color="black">
          <InputGroup>
            <Input
              value={formdata.username}
              onChange={(e) =>
                setFormData({ ...formdata, username: e.target.value })
              }
              type="text"
              border="1px solid #4a5057"
              placeholder="Enter Your Full Name"
              color="white"
              autoFocus
              autoComplete="true"
              required
            />
          </InputGroup>
          <br />

          <InputGroup>
            <Input
              value={formdata.email}
              onChange={(e) =>
                setFormData({
                  ...formdata,
                  email: e.target.value.toLowerCase(),
                })
              }
              type="email"
              border="1px solid #4a5057"
              placeholder="Enter Your Email"
              color="white"
              autoComplete="true"
              required
            />
          </InputGroup>
          <br />

          <InputGroup>
            <InputRightElement
              fontWeight="bold"
              fontSize="13px"
              color="blue"
              border={"1px solid #4a5057"}
              _hover={{ cursor: "pointer" }}
              onClick={() => setShow(!show)}
            >
              {show ? "Hide" : "Show"}
            </InputRightElement>
            <Input
              value={formdata.password}
              onChange={(e) =>
                setFormData({ ...formdata, password: e.target.value })
              }
              border={error ? "1px solid red" : "1px solid #4a5057"}
              type={show ? "text" : "password"}
              placeholder="Enter Your Password"
              color="white"
              autoComplete="true"
              required
            />
          </InputGroup>
          <FormHelperText color={error ? "red" : "#4a5057"}>
            🔒Password must be atleast 8 Characters, and contains one UpperCase,
            one LowerCase, One Number and One Special Chracter.
          </FormHelperText>
          <br />

          {loading ? (
            <Button
              w="100%"
              isLoading
              loadingText="Signing"
              colorScheme="#6f94ec"
              variant="solid"
              bg="teal"
            ></Button>
          ) : (
            <Button
              color="white"
              w="100%"
              bg="#618df2"
              _hover={{ bg: "#5378ce" }}
              type="submit"
              mb="5px"
            >
              Sign up
            </Button>
          )}
        </FormControl>
        <Text color="#cdc6c7" textAlign="center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "white", cursor: "pointer" }}
          >
            Log in
          </span>
        </Text>
      </form>
    </Flex>
  );
}
