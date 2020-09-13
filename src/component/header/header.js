import React from "react";
import "./header.css";

function Header() {
  return (
    <div>
      <header>
        <div className="logo">Order Dashboard</div>
        <div>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Service</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;
