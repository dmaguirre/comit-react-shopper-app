import React, { useState } from "react";

import "./index.css";
import Nav from "./Nav";
import ItemsTable from "./ItemsTable";
import CartTable from "./CartTable";

export default function App() {
  const [selectedTab, setSelectedTab] = useState("items");

  const handleSelectTab = (tab) => {
    console.log(tab);
    setSelectedTab(tab);
    return undefined;
  };

  return (
    <div className="container">
      <Nav onSelectTab={handleSelectTab} />

      {selectedTab === "items" ? <ItemsTable /> : <CartTable />}
    </div>
  );
}
