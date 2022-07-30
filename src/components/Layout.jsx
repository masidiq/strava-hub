import styles from "../styles/layout.module.scss";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Container } from "@chakra-ui/react";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Container maxW="xl" pt="18px" px="0">
        <Outlet />
      </Container>
    </>
  );
}
