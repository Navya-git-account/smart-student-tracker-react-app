import React from "react";


function Header({ setActivePage }) {
  return (
    <header className="header">
      <h1>Smart Student Tracker</h1>
      <nav className="nav-header">
        <button onClick={() => setActivePage("home")}>Home</button>
        <button onClick={() => setActivePage("dashboard")}>Dashboard</button>
        <button onClick={() => setActivePage("about")}>About</button>
        <button onClick={() => setActivePage("contact")}>Contact</button>
      </nav>
    </header>
  );
}

export default Header;