import styles from "../styles/layout.module.scss";
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";
import { Container } from "@chakra-ui/react";

export default function Layout() {
  return (
    <>
      <AdminNavbar title="Admin" />
      <Container maxW="xl" pt="20px">
        <Outlet />
      </Container>
    </>
  );
}
