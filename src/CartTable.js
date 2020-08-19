import React from "react";

import Item from "./Item";

export default function CartTable(props) {
  return (
    <ul className="items">
      {props.items.map((item) => (
        <li key={item.id}>
          <Item item={item}>{item.quantity}</Item>
        </li>
      ))}
    </ul>
  );
}
