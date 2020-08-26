import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import "./index.css";
import Nav from "./Nav";
import SignUpForm from "./SignUpForm";
import ItemsTable from "./ItemsTable";
import CartTable from "./CartTable";

export default function App() {
  const [formValues, setFormValues] = useState({});
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
      const response = await axios.get("http://localhost:4000/cart", {
        headers: { Authorization: `Bearer<${localStorage.getItem("token")}>` },
      });
      const fetchedCartItems = response.data;
      setCartItems(fetchedCartItems);
    };

    fetchItems();
    fetchCartItems();
  }, []);

  const handleFormChange = (event) => {
    setFormValues({ ...formValues, [event.target.id]: event.target.value });
  };

  const handleSubmitSignUp = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      "http://localhost:4000/login",
      formValues
    );
    console.log(response);
    if (response.status < 400 && response.data.success) {
      const token = response.data.token;
      localStorage.setItem("token", token);
    }
  };

  const handleAddToCart = async (item) => {
    const response = await axios.post("http://localhost:4000/cart", item, {
      headers: { Authorization: `Bearer<${localStorage.getItem("token")}>` },
    });
    if (response.status < 400) {
      const updatedCartItems = [...cartItems, item];
      setCartItems(updatedCartItems);
    }
  };

  return (
    <div className="container">
      <Nav />

      <Switch>
        <Route
          path="/signup"
          render={() => (
            <SignUpForm
              handleSubmit={handleSubmitSignUp}
              handleChange={handleFormChange}
            />
          )}
        />
        <Route
          path="/items"
          render={() => (
            <ItemsTable items={items} handleClick={handleAddToCart} />
          )}
        />
        <Route path="/cart" render={() => <CartTable items={cartItems} />} />
        <Redirect to="/items" />
      </Switch>
    </div>
  );
}
