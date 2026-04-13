import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="header">
      <h1 className="logo">🧑🏻‍🎓 Smart Student Tracker</h1>

      <div
        className="hamburger"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <div></div><div></div><div></div>
      </div>

      <nav className={`nav-header ${showMobileMenu ? "active" : ""}`}>

        <Link to="/" onClick={() => setShowMobileMenu(false)}>Home</Link>
        <Link to="/dashboard" onClick={() => setShowMobileMenu(false)}>Dashboard</Link>
        <Link to="/about" onClick={() => setShowMobileMenu(false)}>About</Link>
        <Link to="/contact" onClick={() => setShowMobileMenu(false)}>Contact</Link>

      </nav>
    </header>
  );
}

export default Header;