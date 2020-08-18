import React from "react";

export default function Nav(props) {
  return (
    <ul>
      <li>
        <button onClick={() => props.onSelectTab("items")}>Items</button>
      </li>
      <li>
        <button onClick={() => props.onSelectTab("cart")}>Cart</button>
      </li>
    </ul>
  );
}
