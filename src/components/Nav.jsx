import React, { useState } from "react";
import '../assets/styles/Nav.css';

function Navbar({ setCurrentPage }) {
  const [navMenuClass, setNavMenuClass] = useState("nav__menu");
  const [menuIconClass, setMenuIconClass] = useState("nav__toggler");
  const [isThemeActive, setIsThemeActive] = useState(false);

  const handleThemeToggle = () => {
    setIsThemeActive(!isThemeActive);
  };

  const toggleMobileMenu = () => {
    setNavMenuClass(navMenuClass === "nav__menu" ? "nav__menu nav__active" : "nav__menu");
    setMenuIconClass(menuIconClass === "nav__toggler" ? "nav__toggler toggle" : "nav__toggler");
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setNavMenuClass("nav__menu");
    setMenuIconClass("nav__toggler");
  };

  return (
    <nav className="nav">
      <div className="logo" onClick={() => handleNavigation('home')}>
        <span>Home</span>
      </div>
      <ul className={navMenuClass}>
        <li className="nav__item">
          <button className="nav__link" onClick={() => handleNavigation('about')}>
            About
          </button>
        </li>
        <li className="nav__item">
          <button className="nav__link" onClick={() => handleNavigation('projects')}>
            Projects
          </button>
        </li>
        <li className="nav__item">
          <button className="nav__link" onClick={() => handleNavigation('contact')}>
            Contact
          </button>
        </li>
        <li className="nav__item">
          <button 
            className={`theme-switcher ${isThemeActive ? 'active' : ''}`}
            onClick={handleThemeToggle}
          ></button>
        </li>
      </ul>
      
      <div onClick={toggleMobileMenu} className={menuIconClass}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;