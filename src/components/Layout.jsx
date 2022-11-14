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
      backgroundImage="/bg.png"
      minH={{ base: "calc(100vh - 60px)", md: "100vh" }}
      position="relative"
    >
      <Navbar />
      <Container maxW="xl" px="0" pb="90px" pt={{ md: "15px" }} bg="bg.base">
        <Outlet />
      </Container>

      <Box position="absolute" bottom="30px" w="full">
        <HStack justify="center" mb="5px" color="muted">
          <Link href="https://www.instagram.com/commestudios" target="_blank">
            <BsInstagram as={Icon} />
          </Link>{" "}
          <Link href="https://www.strava.com/clubs/809598" target="_blank">
            <BsStrava as={Icon} />
          </Link>
        </HStack>
        <Text textAlign="center" fontSize="sm">
          © 2022
        </Text>
      </Box>
    </Box>
  );
}
