import styles from "../styles/layout.module.scss";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <main className={styles.main}>
        <Outlet />
      </main>
      <Navbar />
    </>
  );
}
