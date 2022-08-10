import styles from "../styles/layout.module.scss";
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";

export default function Layout() {
  return (
    <Box
      bg="bg.base"
      minH={{ base: "calc(100vh - 60px)", md: "100vh" }}
      position="relative"
    >
      <AdminNavbar title="Admin" />
      <Container maxW="xl" pt="20px">
        <Outlet />
      </Container>
    </Box>
  );
}
