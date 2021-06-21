import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hours, setHours] = useState("");
  const [visibilityStateUser, setVisibilityStateUser] = useState("grid")
  const [visibilityStateRestaurant, setVisibilityStateRestaurant] = useState("none")

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await dispatch(signUp(username, email, password));
    }
  };

  const onSignUpRestaurant = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await dispatch(signUp(username, email, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateAddress = (e) => {
    setAddress(e.target.value);
  };

  const updateCity = (e) => {
    setCity(e.target.value);
  };

  const updateState = (e) => {
    setState(e.target.value);
  };

  const updateZip = (e) => {
    setZip(e.target.value);
  };

  const updatePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const updateHours = (e) => {
    setHours(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  const toggleVisibility = () => {

    if (visibilityStateUser == 'grid') {
      setVisibilityStateUser('none');
      setVisibilityStateRestaurant('grid')
    } else {
      setVisibilityStateUser('grid');
      setVisibilityStateRestaurant('none')
    }
    
  }
  
  return (
    <>
    <form onSubmit={onSignUp} >
      <div className='sign-up-form' style={{display: visibilityStateUser}}>
        <div className='sign-up-form-header'>Welcome to LocalPlates!</div>
        <div className='form-field-input-container'>
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
            placeholder="Username"
            className='form-field-input'
          ></input>
        </div>
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
        <div className='form-field-input-container'>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            placeholder="Re-enter Password"
            className='form-field-input'
          ></input>
        </div>
        <input type="checkbox" value={false} style = {{visibility: "hidden"}}></input>
        <div className="form-field-button-container"><button type="submit" className="form-field-button">Create Account</button></div>
      </div>
    </form>



    <form onSubmit={onSignUpRestaurant} >
      <div className='sign-up-form' style={{display: visibilityStateRestaurant}}>
        <div className='sign-up-form-header'>Welcome to LocalPlates!</div>
        <div className='form-field-input-container'>
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
            placeholder="Username"
            className='form-field-input'
          ></input>
        </div>
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
            type="text"
            name="name"
            onChange={updateName}
            value={email}
            placeholder="Restaurant Name"
            className='form-field-input'
          ></input>
        </div>
        <div className='form-field-input-container'>
          <input
            type="text"
            name="address"
            onChange={updateAddress}
            value={email}
            placeholder="Street Address"
            className='form-field-input'
          ></input>
        </div>
        <div className='form-field-input-container'>
          <input
            type="text"
            name="city"
            onChange={updateCity}
            value={email}
            placeholder="City"
            className='form-field-input'
          ></input>
        </div>
        <div className='form-field-input-container'>
          <input
            type="text"
            name="state"
            onChange={updateState}
            value={email}
            placeholder="State"
            className='form-field-input'
          ></input>
        </div>
        <div className='form-field-input-container'>
          <input
            type="text"
            name="zip"
            onChange={updateZip}
            value={email}
            placeholder="Zipcode"
            className='form-field-input'
          ></input>
        </div>
        <div className='form-field-input-container'>
          <input
            type="text"
            name="phoneNumber"
            onChange={updatePhoneNumber}
            value={email}
            placeholder="Phone Number"
            className='form-field-input'
          ></input>
        </div>
        <div className='form-field-input-container'>
          <input
            type="text"
            name="hours"
            onChange={updateHours}
            value={email}
            placeholder="Hours"
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
        <div className='form-field-input-container'>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            placeholder="Re-enter Password"
            className='form-field-input'
          ></input>
        </div>
        <input type="checkbox" value={false} style = {{visibility: "hidden"}}></input>
        <div className="form-field-button-container"><button type="submit" className="form-field-button">Create Account</button></div>
      </div>
    </form>



    <div className="restaurant-owner-box">
      <form>
        <input id="form-toggle" type="checkbox" onChange={toggleVisibility}></input> Restaurant owner?
      </form>
    </div>
    </>
  );
};

export default SignUpForm;