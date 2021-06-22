import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'


let lat;
let lng;

const getIPInfo = async () => {
  let res = await fetch('https://ipapi.co/json/');
  let ip = await res.json();
  let apiKey = process.env.REACT_APP_IPAPI_KEY;
  console.log("APIKEY!!!!!", apiKey)
  let locres = await fetch(`https://api.ipapi.com/api/${ip.ip}?access_key=${apiKey}`)
  let location = await locres.json();
  console.log(ip);
  console.log(location);
}



const NavBar = ({  }) => {
  
  useEffect(() => {
    getIPInfo();
  });

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;