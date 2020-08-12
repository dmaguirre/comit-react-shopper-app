import React from "react";

export default function ItemsTable() {
  const items = [
    {
      id: 1,
      name: "Apple iPad Mini 2 16GB",
      description: "An iPad like no other.",
      price: 229,
    },
    {
      id: 2,
      name: "Apple iPad Mini 2 32GB",
      description: "Even larger than the 16GB.",
      price: 279,
    },
  ];

  const rows = items.map((item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
    </tr>
  ));

  return (
    <table>
      <tbody>{rows}</tbody>
    </table>
  );
}
