import React from "react";
import { NavLink } from "react-router-dom";
import "./header.scss";
const index = () => {
  return (
    <header>
      {/* Logo */}
      <h2>Is Takip</h2>
      {/* Navigation */}
      <nav>
        <NavLink to="/">Is Listesi</NavLink>
        <NavLink to="/create">Is Ekle </NavLink>
      </nav>
    </header>
  );
};

export default index;
