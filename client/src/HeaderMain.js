import React from 'react';
import './HeaderMain.css';
import {Link} from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function HeaderMain() {

  const [{ user }, dispatch] = useStateValue();
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <nav className='headerMain'>
       <Link to={!user && "/login"} className="header__link">
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              Hello, {!user ? "Guest" : user.email}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
    </nav>
  )
}

export default HeaderMain
