import styles from "../styles/layout.module.scss";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Box, Container, Flex, HStack, Icon, Link, Text } from "@chakra-ui/react";
import { IoLogoInstagram } from "react-icons/io5";
import { SiLinktree } from "react-icons/si";
import { BsInstagram, BsStrava } from "react-icons/bs";

export default function Layout() {
  return (
    <Box minH={{ base: "calc(100vh - 10px)", md: "100vh" }} position="relative">
      <Container maxW="xl" px="0" pb="90px" pt={{ md: "15px" }} position="relative">
        <Outlet />
      </Container>
      <Box position="absolute" bottom="20px" w="full">
        <HStack justify="center" mb="10px" color="muted" spacing="10px">
          <Link href="https://linktr.ee/salasakahij1" target="_blank" title="linktree">
            <SiLinktree as={Icon} />
          </Link>
          <Link href="https://www.instagram.com/salasakahijibandung" target="_blank">
            <BsInstagram as={Icon} />
          </Link>

          <Link href="https://www.strava.com/segments/30711569" target="_blank">
            <BsStrava as={Icon} />
          </Link>
        </HStack>
        <Text textAlign="center" fontSize="sm">
          salasakahiji.com © 2023
        </Text>
      </Box>
    </Box>
  );
}
