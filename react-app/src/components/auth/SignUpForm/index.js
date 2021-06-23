import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { signUp, signUpRestaurant } from '../../../store/session';
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
  const [zipcode, setZipcode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
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
      const formData = new FormData();
      formData.append("image", image); 
      // , username, email, password, name, address, city, state, zip, phoneNumber, hours, description


      setImageLoading(true);

        const res = await fetch('/api/images', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            let profile_photo = await res.json();
            setImageLoading(false);
            const user = await dispatch(signUpRestaurant(profile_photo, username, email, password, name, address, city, state, zipcode, phoneNumber, description));
            console.log(res)
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
      
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

  const updateZipcode = (e) => {
    setZipcode(e.target.value);
  };

  const updatePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateImage = (e) => {
        const file = e.target.files[0];
        document.getElementById('file-label').innerText = "File Chosen"
        setImage(file);
    }

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
            value={name}
            placeholder="Restaurant Name"
            className='form-field-input'
          ></input>
        </div>
        <div className='form-field-input-container'>
          <input
            type="text"
            name="address"
            onChange={updateAddress}
            value={address}
            placeholder="Street Address"
            className='form-field-input'
          ></input>
        </div>
        <div className='form-field-input-container'>
          <input
            type="text"
            name="city"
            onChange={updateCity}
            value={city}
            placeholder="City"
            className='form-field-input'
          ></input>
        </div>
        <div className='form-field-input-container'>
          <input
            type="text"
            name="state"
            onChange={updateState}
            value={state}
            placeholder="State"
            className='form-field-input'
          ></input>
        </div>
        <div className='form-field-input-container'>
          <input
            type="text"
            name="zipcode"
            onChange={updateZipcode}
            value={zipcode}
            placeholder="Zipcode"
            className='form-field-input'
          ></input>
        </div>
        <div className='form-field-input-container'>
          <input
            type="text"
            name="phoneNumber"
            onChange={updatePhoneNumber}
            value={phoneNumber}
            placeholder="Phone Number"
            className='form-field-input'
          ></input>
        </div>
        <div className='form-field-input-container'>
          <textarea
            name="description"
            onChange={updateDescription}
            value={description}
            placeholder="Description"
            className='form-field-input form-field-textarea'
          />
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
        <div class="file">
            <label for="file-input" id="file-label">Choose a Primary Photo</label>
            <input 
              type="file" 
              id="file-input"
              accept="image/*"
              onChange={updateImage}
            ></input>
        </div>
        <input type="checkbox" value={false} style = {{visibility: "hidden"}}></input>
        <div className="form-field-button-container"><button type="submit" className="form-field-button">Create Account</button></div>
        {(imageLoading)&& <p>Loading...</p>}
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
