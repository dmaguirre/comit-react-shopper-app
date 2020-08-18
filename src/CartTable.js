import React from "react";

export default function CartTable() {
  const items = [
    {
      id: 1,
      name: "Apple iPad Mini 2 16GB",
      description: "An iPad like no other.",
      price: 229,
    },
    {
      id: 3,
      name: "Canon T6i",
      description: "DSLR camera with lots of megapixels.",
      price: 749.99,
    },
  ];

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
