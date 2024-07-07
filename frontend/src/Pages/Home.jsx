import { Flex, Text, Button, Heading, Box } from "@chakra-ui/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export function Home() {
  let token = Cookies.get("tokens");
  const navigate = useNavigate();

  return (
    <>
      <Box w={{ lg: "40%", md: "70%", sm: "70%", base: "90%" }} mx={"auto"}>
        <Heading
          color={"white"}
          mt={"150px"}
          textAlign={"center"}
          fontSize={{ lg: "60px", md: "60px", sm: "50px", base: "40px" }}
          mx={"auto"}
        >
          The simplest way to keep notes
        </Heading>
        <Text color="white" textAlign="center" mt="20px" fontSize="19px">
          All your notes, synced on all your devices. Get Simplenote now for
          iOS, Android, Mac, Windows, Linux, or in your browser.
        </Text>
        {!token && (
          <Box textAlign={"center"} mt={"25px"}>
            <NavLink to={"/signup"}>
              <Button bg={"#3361cc"} color="white" _hover={"none"}>
                Sign up now
              </Button>
            </NavLink>
          </Box>
        )}
        {token && (
          <Box mt={"20px"}>
            <Button
              onClick={() => navigate("/notes")}
              _hover={{ bg: "#5378ce" }}
              boxShadow="#313131 0px 3px 8px"
              w="40%"
              display="block"
              margin="auto"
              fontWeight="bold"
              color="#fff"
              bg="#3361cc"
              border="none"
              p="10px 0px"
            >
              See Your Notes
            </Button>
          </Box>
        )}
      </Box>
      <Flex justifyContent={"center"} mt={"260px"} alignItems={"center"}>
        <Text color={"#5a5b5d"}>Designed and Maintained by Ganesh Kumar</Text>
      </Flex>
    </>
  );
}
