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
    <table>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
