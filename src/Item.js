import React from "react";

export default function Item(props) {
  return (
    <div>
      <img height="20" width="20" />
      <div className="item-middle">
        {props.item.name}
        {props.item.description}
      </div>
      <div className="item-end">
        {props.item.price}
        <button>Add to Cart</button>
      </div>
    </div>
  );
}
