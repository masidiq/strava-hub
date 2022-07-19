import styles from "../../styles/navbar.module.scss";

import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/salasa-kahiji">
              <div>
                Salasa <br />
                Kahiji
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/kbp-loop">
              <div>
                {" "}
                KBP <br />
                Loop
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/gbla-loop">
              <div>
                GBLA <br />
                Loop
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/other">Other</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
