import React, { useState, useEffect } from "react";
import axios from "axios";

import "./index.css";
import Nav from "./Nav";
import ItemsTable from "./ItemsTable";
import CartTable from "./CartTable";

export default function App() {
  const [selectedTab, setSelectedTab] = useState("items");
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get("http://localhost:4000/items");
      console.log(response);
      const fetchedItems = response.data;
      console.log(`fetched items: ${fetchedItems}`);
      setItems(fetchedItems);
    };

    const fetchCartItems = async () => {
      const response = await axios.get("http://localhost:4000/cart");
      const fetchedCartItems = response.data;
      setCartItems(fetchedCartItems);
    };

    fetchItems();
    fetchCartItems();
  }, []);

  const handleSelectTab = (tab) => {
    console.log(tab);
    setSelectedTab(tab);
  };

  const handleAddToCart = async (item) => {
    const response = await axios.post("http://localhost:4000/cart", item);
    if (response.status < 400) {
      const updatedCartItems = [...cartItems, item];
      setCartItems(updatedCartItems);
    }
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
