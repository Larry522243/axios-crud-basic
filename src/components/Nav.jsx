import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import styles from "../css/navbar.module.css";
const Nav = () => {
  return (
    <>
      <nav>
        <ul className={`${styles.navbar} ${styles.listNo}`}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="Company">Company</NavLink>
          </li>
          <li>
            <NavLink to="About">About</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
export default Nav;
