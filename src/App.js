import React, { useState } from "react";

import "./index.css";
import Nav from "./Nav";
import ItemsTable from "./ItemsTable";
import CartTable from "./CartTable";

export default function App() {
  const [selectedTab, setSelectedTab] = useState("items");
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Apple iPad Mini 2 16GB",
      description: "An iPad like no other.",
      price: 300,
      quantity: 3,
    },
    {
      id: 3,
      name: "Canon T6i",
      description: "DSLR camera with lots of megapixels.",
      price: 749.99,
      quantity: 1,
    },
  ]);

  const items = [
    {
      id: 0,
      name: "Apple iPad",
      description: "An iPad like no other. WiFi, 4G, lots of storage.",
      price: 329.0,
    },
    {
      id: 1,
      name: "Apple iPad Pro",
      description: "Even more expensive than the regular iPad.",
      price: 799.0,
    },
    {
      id: 2,
      name: "Canon T7i",
      description: "DSLR camera with lots of megapixels.",
      price: 749.99,
    },
    {
      id: 3,
      name: "Apple Watch Sport",
      description: "A watch",
      price: 249.99,
    },
    {
      id: 4,
      name: "Apple Watch Silver",
      description: "A more expensive watch",
      price: 599.99,
    },
  ];

  const handleSelectTab = (tab) => {
    console.log(tab);
    setSelectedTab(tab);
    return undefined;
  };

  const handleAddToCart = (item) => {
    const updatedCartItems = [...cartItems, item];
    setCartItems(updatedCartItems);
  };

  return (
    <div className="container">
      <Nav selectedTab={selectedTab} onSelectTab={handleSelectTab} />

      {selectedTab === "items" ? (
        <ItemsTable items={items} handleClick={handleAddToCart} />
      ) : (
        <CartTable items={cartItems} />
      )}
    </div>
  );
}
