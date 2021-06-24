import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "./LogoutStyle.css"
const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button className="nav-logout" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
