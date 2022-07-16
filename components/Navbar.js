import styles from "../styles/navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li className={router.pathname == "/" ? styles.active : ""}>
            <Link href="/">Home</Link>
          </li>
          <li
            className={router.pathname == "/salasa-kahiji" ? styles.active : ""}
          >
            <Link href="/salasa-kahiji">
              <div>
                Salasa <br />
                Kahiji
              </div>
            </Link>
          </li>
          <li className={router.pathname == "/kbp-loop" ? styles.active : ""}>
            <Link href="/kbp-loop">
              <div>
                {" "}
                KBP <br />
                Loop
              </div>
            </Link>
          </li>
          <li className={router.pathname == "/gbla-loop" ? styles.active : ""}>
            <Link href="/gbla-loop">
              <div>
                GBLA <br />
                Loop
              </div>
            </Link>
          </li>
          <li className={router.pathname == "/other" ? styles.active : ""}>
            <Link href="/other">Other</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
