import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userlogin } from "../Redux/UserData/action";
import { USER_FAIL, USER_LOGIN_SUCCESS } from "../Redux/actionTypes";
import Cookies from "js-cookie";
import logo from "../assets/Simplenote_logo.svg";

export function Login() {
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });
  let token = Cookies.get("tokens");
  let username = Cookies.get("username");

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.userReducer.loading);
  const toast = useToast();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(userlogin(formdata))
      .then((res) => {
        dispatch({ type: USER_LOGIN_SUCCESS });
        setFormData({ email: "", password: "" });
        toast({
          title: `${res.data.msg}`,
          position: "bottom",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        Cookies.set("username", `${res.data.name}`, { expires: 2 });
        Cookies.set("tokens", `${res.data.token}`, { expires: 2 });

        setTimeout(() => {
          if (location.state === null) {
            navigate("/");
          } else {
            navigate(`${location.state}`);
          }
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
    <Flex mt="150px" mb="100px">
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
          <Image src={logo} w={"25px"} />
          <Text
            textShadow="1px 1px #000"
            fontWeight="bold"
            fontSize="20px"
            color="white"
            letterSpacing="1px"
            textAlign="center"
          >
            Login{" "}
          </Text>
        </Flex>
        <br />

        <FormControl isRequired color="black">
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
              autoFocus
              autoComplete="true"
              required
            />
          </InputGroup>
          <br />

          <InputGroup>
            <InputRightElement
              fontWeight="bold"
              fontSize="13px"
              border="1px solid #4a5057"
              color="blue"
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
              border="1px solid #4a5057"
              type={show ? "text" : "password"}
              placeholder="Enter Your Password"
              color="white"
              autoComplete="true"
              required
            />
          </InputGroup>
          <br />

          {loading ? (
            <Button
              w="100%"
              isLoading
              loadingText="Logging"
              colorScheme="#6f94ec"
              variant="solid"
              bg="teal"
            ></Button>
          ) : (
            <Button
              w="100%"
              bg="#618df2"
              _hover={{ bg: "#5378ce" }}
              type="submit"
              mb="10px"
              color="white"
            >
              Login
            </Button>
          )}
        </FormControl>
        <Text color="#cdc6c7" textAlign="center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "white", cursor: "pointer" }}
          >
            Sign up
          </span>
        </Text>
      </form>
    </Flex>
  );
}
