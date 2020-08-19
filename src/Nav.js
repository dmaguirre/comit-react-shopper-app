import React from "react";

export default function Nav(props) {
  return (
    <ul className="nav">
      <li className={props.selectedTab === "items" ? "active-tab" : ""}>
        <button onClick={() => props.onSelectTab("items")}>Items</button>
      </li>
      <li className={props.selectedTab === "cart" ? "active-tab" : ""}>
        <button onClick={() => props.onSelectTab("cart")}>Cart</button>
      </li>
    </ul>
  );
}
