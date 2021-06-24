import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getUser } from "../store/user"


function User() {
  const [user, setUser] = useState({});
  // Notice we use useParams here instead of getting the params
  // From props.
  const dispatch = useDispatch();
  const { userId } = useParams();
  const sessionUser = useSelector(state => state.session.user)
  const [feature, setFeature] = useState("")


  const updateFeature = (stri) => {
    setFeature(stri)
  }

  useEffect(() => {
    if (!userId) {
      return;
    }

    console.log(Number(userId), sessionUser.id)
    if (Number(userId) !== sessionUser.id){
      return Redirect('/')
    }
    dispatch(getUser(userId))

  }, [userId, dispatch]);


  function Bookings() {
    return (
      <>
        <h2>Your Upcoming Reservations: </h2>
        { }
      </>
    )
  }

  function Account() {
    return (
      <>
        <h2>Your Account Details: </h2>
        { }
      </>
    )
  }

  function Favs() {
    return (
      <>
        <h2>Your Favorite Restaurants: </h2>
        {user.favorites && user.favorites.map(favorite => <li key="favorite" >favorite.id</li>) || <p>You have no favorites</p>}
      </>
    )
  }

  return (

    <div className="profile-body">
      <div className="sub-header">
        <h1>{sessionUser.username}</h1>
      </div>
      <div className="profile-links">
        <p onClick={() => updateFeature("bookings")}>Bookings</p>
        <p onClick={() => updateFeature("account")}>Account Details</p>
        <p onClick={() => updateFeature("favs")}>Favorites</p>
      </div>
      <div className="profile-feature">
        {feature == "bookings" && <Bookings />}
        {feature == "account" && <Account />}
        {feature == "favs" && <Favs />}
      </div>
    </div>
  );
}
export default User;
