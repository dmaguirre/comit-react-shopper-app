import React from "react";

export default function Item(props) {
  return (
    <div className="item">
      <img height="50" width="50" />
      <div className="item-middle">
        <div>{props.item.name}</div>
        <div>{props.item.description}</div>
      </div>
      <div className="item-end">
        {props.item.price}
        <button>Add to Cart</button>
      </div>
    </div>
  );
}
