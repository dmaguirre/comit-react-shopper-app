import React, { useState, useEffect, useMemo } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import {orderBy} from 'lodash';

import "./index.css";
import AuthProvider from "./auth/AuthProvider";
import Nav from "./Nav";
import ItemsTable from "./ItemsTable";
import CartTable from "./CartTable";
import Login from "./auth/Login";

export default function App() {
  const [selectedTab, setSelectedTab] = useState("items");
  const [sortCriteria, setSortCriteria] = useState(['name', 'asc']);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get("http://localhost:4000/items");
      // console.log(response);
      const fetchedItems = response.data;
      // console.log(`fetched items: ${fetchedItems}`);
      setItems(fetchedItems);
    };

    const fetchCartItems = async () => {
      const response = await axios.get("http://localhost:4000/cart");
      const fetchedCartItems = response.data;
      console.log(fetchedCartItems);

      setCartItems(fetchedCartItems);
    };

    fetchItems();
    //fetchCartItems();
  }, []);

  const sortedItems = useMemo(() => {
    return orderBy(items, sortCriteria[0], sortCriteria[1]);
  }, [items, sortCriteria])

  const handleSelectTab = (tab) => {
    console.log(tab);
    setSelectedTab(tab);
  };

  const handleAddToCart = async (item) => {
    const existingCartItem = cartItems.find(
      (cartItem) => item.id === cartItem.itemId
    );

    if (existingCartItem) {
      console.log(existingCartItem);
      increaseQuantity(existingCartItem);
    } else {
      addNewItem(item);
    }
  };

  const increaseQuantity = async (existingCartItem) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      return cartItem.itemId === existingCartItem.itemId
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
    const updatedCartItem = updatedCartItems.find(
      (cartItem) => cartItem.itemId === existingCartItem.itemId
    );
    const response = await axios.put(
      `http://localhost:4000/cart/${updatedCartItem.id}`,
      updatedCartItem
    );
    if (response.status < 400) {
      setCartItems(updatedCartItems);
    }
  };

  const addNewItem = async (item) => {
    const cartItem = {
      itemId: item.id,
      quantity: 1,
    };
    const response = await axios.post("http://localhost:4000/cart", cartItem);
    if (response.status < 400) {
      const updatedCartItems = [...cartItems, cartItem];
      setCartItems(updatedCartItems);
    }
  };

  const setCartItemsValues = () => {
    return cartItems.map((cartItem) => {
      const item = items.find((item) => item.id === cartItem.itemId);
      return {
        ...cartItem,
        name: item.name,
        description: item.description,
        price: item.price,
      };
    });
  };

  return (
    <div className="container">
      <AuthProvider>
        <Nav selectedTab={selectedTab} onSelectTab={handleSelectTab} />

        <Switch>
          <Route
            path="/items"
            render={() => (
              <ItemsTable items={sortedItems} handleClick={handleAddToCart} />
            )}
          ></Route>

          <Route
            path="/cart"
            render={() => <CartTable items={setCartItemsValues()} />}
          ></Route>

          <Route
            path="/login"
            component={Login}
          ></Route>

          <Redirect to="/items" />
        </Switch>
      </AuthProvider>
    </div>
  );
}
