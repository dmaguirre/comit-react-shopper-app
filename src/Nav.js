import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav(props) {
  return (
    <ul className="nav">
      <li>
        <NavLink
          className="nav-button"
          activeClassName="active-tab"
          to="/items"
        >
          Items
        </NavLink>
      </li>
      <li>
        <NavLink className="nav-button" activeClassName="active-tab" to="/cart">
          Cart
        </NavLink>
      </li>
      <li>
        <NavLink className="nav-button" activeClassName="active-tab" to="/login">
          Login
        </NavLink>
      </li>
    </ul>
  );
}
