import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';
import logo from '../images/logo-vanilla-marketing.png';
import HamburgerMenu from 'react-hamburger-menu';

export default function NavBar() {
  const [open, setVisible] = useState(false);

  return (
    <header>
      <div id="header-mobile-container">
        <div>
          <img className="logo" src={logo} alt="logo-vanilla-marketing" />
        </div>
        <div id="burger-icon">
          <HamburgerMenu
            isOpen={open}
            menuClicked={() => setVisible(!open)}
            width={30}
            height={18}
            strokeWidth={3}
            rotate={0}
            color="black"
            borderRadius={0}
            animationDuration={0.1}
          />
        </div>
      </div>
      {open && (
        <nav id="header-nav">
          <ul>
            <Link to="/tickets">I miei tickets</Link>
            <Link to="/crea-ticket">Apri un ticket</Link>
            <p id="logout-btn">Logout</p>
          </ul>
        </nav>
      )}
    </header>
  );
}
