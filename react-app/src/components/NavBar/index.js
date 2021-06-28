import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useDispatch, useSelector } from "react-redux";
import {login} from "../../store/session"
import './NavBar.css'




const NavBar = ({  }) => {
  const dispatch = useDispatch();
  const handleSubmit = async (e)=>{

    const data= await dispatch(login("fake@email.com","password"));

  }


  const user = useSelector(state => state.session.user);
  useEffect(()=>{
  },[user])
  return (
    <nav className="nav-bar-container">

        <div className="nav-left">
            <NavLink to="/" exact={true} className="link nav-home" >
            <i class="fas fa-home"></i>
            </NavLink>
          {(user!==null) &&
            <div className="nav-welcome">
              Hello! {user.username}
            </div>}
        </div>
        <div className="nav-middle"><img className="navigation-bar-logo" src="/images/localplates.png"></img></div>
        <div className="nav-right">

          { (user===null) &&
            <button to="/sign-up" className="nav-buttons demo-user-button" onClick={handleSubmit}>
              Demo User
            </button>}

          { (user===null) &&
            <NavLink to="/sign-up" exact={true} className="link nav-signup nav-buttons" activeClassName="active">
              Sign Up
            </NavLink>}
          {(user===null) &&
          <NavLink to="/login" exact={true} className="link nav-login nav-buttons" activeClassName="active">
            Login
          </NavLink>}

          { (user!==null) &&
          <NavLink to="/users" exact={true} className="link nav-user" activeClassName="active">
            <i class="fa fa-user" aria-hidden="true"></i>
          </NavLink>}

          {(user!==null) &&
            <LogoutButton className="nav-logout"/>}
        </div>
    </nav>
  );
}

export default NavBar;
