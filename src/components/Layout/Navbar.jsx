import styles from "../../styles/navbar.module.scss";

import { NavLink } from "react-router-dom";
export default function Navbar() {
  let activeStyle = {
    fontWeight: "bold",
  };

  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/salasa-kahiji"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <div>
                Salasa <br />
                Kahiji
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/kbp-loop"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <div>
                {" "}
                KBP <br />
                Loop
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gbla-loop"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <div>
                GBLA <br />
                Loop
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/other"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Other
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
