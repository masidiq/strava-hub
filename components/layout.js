import Head from "next/head";
import styles from "../styles/layout.module.css";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Gowkeun</title>
      </Head>
      <main className={styles.main}>{children}</main>
      <Navbar />
    </>
  );
}
