import React from "react";
import {
  Flex,
  Text,
  Button,
  useToast,
  Box,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import logo from "../assets/Simplenote_logo.svg";

export function Navbar() {
  const navigate = useNavigate();
  const toast = useToast();
  let token = Cookies.get("tokens");
  let username = Cookies.get("username");
  let goodname = username?.split(" ").map((item) => {
    return item[0].toUpperCase();
  });

  const styles = {
    color: "#5a5b5d",
    textDecoration: "none",
    fontWeight: "500",
  };
  const styles1 = {
    color: "white",
    textDecoration: "none",
    fontWeight: "400",
  };

  const handleLoggedout = () => {
    axios
      .post(
        "https://notes-api-7d7v.onrender.com/users/logout",
        { token: `${token}` },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast({
          title: `${res.data.msg}`,
          position: "bottom",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        Cookies.remove("tokens");
        Cookies.remove("username");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
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
    <Flex
      justifyContent="space-between"
      background="transparent"
      backdropFilter="blur(40px)"
      color="black"
      position="fixed"
      top="0"
      width="100%"
      height="50px"
      alignItems="center"
      p={{
        base: "0px 10px",
        sm: "0px 10px",
        md: "0px 30px 0px 60px",
        lg: "0px 30px 0px 60px",
        xl: "0px 30px 0px 60px",
      }}
      zIndex="9999"
    >
      <Flex gap={"8px"} justifyContent={"center"} alignItems={"center"}>
        <Image src={logo} w={"25px"} gap={"5px"} />
        <Text
          _hover={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
          color="white"
          fontFamily="Helvetica Neue"
          fontSize="25px"
        >
          Simplenote
        </Text>
      </Flex>

      <Flex
        display={{
          base: "none",
          sm: "none",
          md: "flex",
          lg: "flex",
          xl: "flex",
        }}
        width="450px"
        justifyContent="space-between"
        alignItems="center"
      >
        <NavLink
          style={({ isActive }) => {
            return isActive ? styles : styles1;
          }}
          to="/"
        >
          Home
        </NavLink>
        {!token && (
          <NavLink
            style={({ isActive }) => {
              return isActive ? styles : styles1;
            }}
            to="/login"
          >
            Login
          </NavLink>
        )}
        {!token && (
          <NavLink
            style={({ isActive }) => {
              return isActive ? styles : styles1;
            }}
            to="/signup"
          >
            Signup
          </NavLink>
        )}
        <NavLink
          style={({ isActive }) => {
            return isActive ? styles : styles1;
          }}
          to="/notes"
        >
          My Notes
        </NavLink>
        {token && (
          <Text color="#618df2" fontWeight="500">
            Hi, {username}
          </Text>
        )}
        {token && (
          <Button
            onClick={handleLoggedout}
            bg="#618df2"
            color="#fff"
            borderBottom="1px solid black"
            borderRight="1px solid black"
            _hover={{ bg: "#5378ce" }}
            fontWeight="bold"
            display="block"
          >
            Logout
          </Button>
        )}
      </Flex>
      <Flex
        display={{
          base: "flex",
          sm: "flex",
          md: "none",
          lg: "none",
          xl: "none",
        }}
      >
        <Box>
          <Menu>
            <MenuButton
              fontWeight="bold"
              color="white"
              p={token ? "6px" : "4px 10px 7px 10px"}
              borderRadius="50%"
            >
              {token ? goodname : <HamburgerIcon color="white" boxSize={5} />}
            </MenuButton>
            <MenuList>
              {username && (
                <MenuItem color="blue" fontWeight="500">
                  Hi, {username}
                </MenuItem>
              )}
              {!username && (
                <MenuItem color="blue" fontWeight="500">
                  Welcome to Notes App
                </MenuItem>
              )}
              <MenuItem fontWeight="500" onClick={() => navigate("/")}>
                Home
              </MenuItem>
              <MenuItem fontWeight="500" onClick={() => navigate("/notes")}>
                My Notes
              </MenuItem>
              {!token && (
                <MenuItem
                  color="green"
                  fontWeight="500"
                  onClick={() => navigate("/login")}
                >
                  Login/Signup
                </MenuItem>
              )}
              {token && (
                <MenuItem
                  color="red"
                  fontWeight="500"
                  onClick={handleLoggedout}
                >
                  Logout
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Flex>
  );
}
