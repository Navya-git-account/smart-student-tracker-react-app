import React, { useState } from "react";


function Header({ setActivePage }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleNavClick = (page) => {
    setActivePage(page);
    setShowMobileMenu(false);
  };
  return (
    <header className="header">
      <h1 className="logo">Smart Student Tracker</h1>
      <div
        className="hamburger"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      <nav className={ `nav-header ${showMobileMenu ? "active" : ""}`}>
        <button onClick={() => setActivePage("home")}>Home</button>
        <button onClick={() => setActivePage("dashboard")}>Dashboard</button>
        <button onClick={() => setActivePage("about")}>About</button>
        <button onClick={() => setActivePage("contact")}>Contact</button>
      </nav>
    </header>
  );
}

export default Header;