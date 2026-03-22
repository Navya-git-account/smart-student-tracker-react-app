import React from "react";


function Header() {
  return (
    <header className="header">
      <h1>Smart Student Tracker</h1>
      <nav className="nav-header">
        <button>Home</button>
        <button>Dashboard</button>
        <button>About</button>
        <button>Contact</button>
      </nav>
    </header>
  );
}

export default Header;