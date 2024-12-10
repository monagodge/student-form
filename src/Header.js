import React, { useState } from "react";
import { FaHome, FaPhoneAlt } from 'react-icons/fa'; // Importing icons from react-icons
import "./Header.css"; // Add styles in Header.css

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to trigger the phone call when the icon is clicked
  const callPhoneNumber = () => {
    window.open('tel:+917820897648', '_self');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header sticky">
      <div className="logo">
        <a href="/">
          <img
            src="./DezyKode Logo n name (1).svg"  // Replace with the correct path to your logo
            alt="My Website Logo"
            style={{ width: '150px', height: 'auto' }}  // Adjust size as needed
          />
        </a>
      </div>

      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li className="nav-item left">
            <a href="/">
              <div className="">
                Home
              </div>
            </a>
          </li>
          <li className="nav-item right">
            {/* Phone Icon for Calling */}
            <a href="#!" onClick={callPhoneNumber}>
              <div className="icon-circle">
                <FaPhoneAlt />
              </div>
            </a>
          </li>
        </ul>
      </nav>

      <div className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
};

export default Header;
