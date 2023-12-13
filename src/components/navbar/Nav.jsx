// Nav.jsx
import React, { useState } from "react";

const Nav = ({ setActiveComponent }) => {
  // Sample data for navigation items
  const navItems = [
    { id: 1, title: "Home", component: "Home" },
    { id: 2, title: "Print", component: "Print" },
    { id: 3, title: "Search", component: "Search" },
  ];

  const handleNavItemClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <nav>
      <div style={{ display: "flex", width: "100%" }}>
        {navItems.map((item) => (
          <div
            key={item.id}
            style={{ flex: 0.25, margin: "0 10px", cursor: "pointer" }}
            onClick={() => handleNavItemClick(item.component)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
