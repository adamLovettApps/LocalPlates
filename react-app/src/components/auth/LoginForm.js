import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import SearchBar from "../SearchBar";
import "./LoginForm.css"

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  if (user) {
    if (user.is_owner) {
      console.log(user)
      return <Redirect to={`/restaurantmanagement/${user.restaurant_id}`}></Redirect>
    } else {
    return <Redirect to="/" />;
    }
  }


  return (
    <>
      <div className="search-bar-container"><SearchBar></SearchBar></div>
    <div className="form-wrapper">
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className='log-in-form'>
        <div className='sign-up-form-header'>Welcome to LocalPlates!</div>
        <div className='form-field-input-container'>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            placeholder="Email"
            className='form-field-input'
          ></input>
        </div>
        <div className='form-field-input-container'>
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
            placeholder="Password"
            className='form-field-input'
          ></input>
        </div>
            <div className="form-field-button-container-login"><button type="submit" className="form-field-button">Sign In</button></div>
        </div>
      </form>
    </div>
    </>
  );
};

export default LoginForm;
