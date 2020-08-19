import React from "react";

import Item from "./Item";

export default function ItemsTable(props) {
  return (
    <ul className="items">
      {props.items.map((item) => (
        <li key={item.id}>
          <Item item={item}>
            <button onClick={() => props.handleClick(item)}>Add to Cart</button>
          </Item>
        </li>
      ))}
    </ul>
  );
}
