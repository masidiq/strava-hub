import styles from "../styles/layout.module.scss";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  HStack,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import { IoLogoInstagram } from "react-icons/io5";
import { BsInstagram, BsStrava } from "react-icons/bs";

export default function Layout() {
  return (
    <Box
      bg="bg.base"
      minH={{ base: "calc(100vh - 60px)", md: "100vh" }}
      position="relative"
    >
      <Navbar />
      <Container maxW="xl" px="0" pb="90px" pt={{ md: "15px" }}>
        <Outlet />
      </Container>

      <Box position="absolute" bottom="30px" w="full">
        <Text textAlign="center" fontSize="sm">
          Develop by Sidiq
        </Text>
      </Box>
    </Box>
  );
}
