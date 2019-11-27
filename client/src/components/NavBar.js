import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import './NavBar.css';
import logo from '../images/logo-vanilla-marketing.png';
import HamburgerMenu from 'react-hamburger-menu';
import {serviceAPI} from '../api/serviceAPI';

export default function NavBar({liftUserUp,currentUser}) {
  const [open, setVisible] = useState(false);

  const logoutUser = () => {
    serviceAPI.get('/auth/logout').then(() => {
      liftUserUp(null);
    });
  };

  const alertLogin = ()=> {
    if(!currentUser){
      alert("Questa sezione è privata. Effettua il login per accedere :) ")
    }
  }

  return (
  
    <section>
      <header id="header-mobile">
        <div id="header-mobile-container">
          <div>
            <Link to="/">
              <img className="logo" src={logo} alt="logo-vanilla-marketing" />
            </Link>
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
              <Link onClick={alertLogin} to="/tickets">I miei tickets</Link>
              <Link onClick={alertLogin} to="/crea-ticket">Apri un ticket</Link>
              <p onClick={logoutUser} id="logout-btn">Logout</p>
            </ul>
          </nav>
        )}
      </header>
      <header id="header-desktop">
        <div id="header-desktop-container">
          <div>
            <Link to="/">
              <img className="logo" src={logo} alt="logo-vanilla-marketing" />
            </Link>
          </div>
          <div>
            <nav id="header-nav">
              <ul>
                <Link onClick={alertLogin} to="/tickets">I miei tickets</Link>
                <Link onClick={alertLogin} to="/crea-ticket">Apri un ticket</Link>
              </ul>
            </nav>
          </div>
          <div>
            <p onClick={logoutUser} id="logout-btn">
              Logout
            </p>
          </div>
        </div>
      </header>
     
    </section>
  );
}
