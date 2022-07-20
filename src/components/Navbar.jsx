import styles from "../styles/navbar.module.scss";
import { Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/salasa-kahiji"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              <div>Salasa Kahiji</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/kbp-loop"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              <div> KBP Loop</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gbla-loop"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              <div>GBLA Loop</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/segment-list"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Lainnya
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
