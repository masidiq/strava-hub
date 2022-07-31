import styles from "../styles/layout.module.scss";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Container } from "@chakra-ui/react";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Container maxW="xl" px="0" pb="20px" pt={{ md: "20px" }}>
        <Outlet />
      </Container>
    </>
  );
}
