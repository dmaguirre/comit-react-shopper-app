import React from "react";

import Nav from "./Nav";
import ItemsTable from "./ItemsTable";
import CartTable from "./CartTable";

export default function App() {
  return (
    <div>
      <Nav />

      <ItemsTable />
      <CartTable />
    </div>
  );
}
