import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getUser } from "../../store/user"
import Bookings from './Bookings'
import Account from './Account'
import Reviews from './Reviews'
import { ReviewForm } from './Reviews'
import Favs from './Favorites'
import "./User.css"

function User() {

  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(state => state.user)
  const sessionUser = useSelector(state => state.session.user)
  const [feature, setFeature] = useState("bookings")


  const updateFeature = (stri) => {
    setFeature(stri)
  }

  useEffect(() => {

    if (Number(userId) !== sessionUser.id) {
      return Redirect(`/users/${sessionUser.id}`)
    }
    if (!user.id) {
      dispatch(getUser(sessionUser.id))
    }
  }, [dispatch]);



  if (Number(userId) !== sessionUser.id) {
    return Redirect(`/users/${sessionUser.id}`);
  }

  return (

    <div className="profile-body">
      <div className="sub-header">
        <h1>{user.username}</h1>
      </div>
      <div className="profile-content">
        <div className="profile-links">
          <div onClick={() => updateFeature("bookings")}>Bookings</div>
          <div onClick={() => updateFeature("account")}>Account Details</div>
          <div onClick={() => updateFeature("favs")}>Favorites</div>
          <div onClick={() => updateFeature("reviews")}>Reviews</div>
        </div>
        <div className="profile-feature">
          {feature === "bookings" && <Bookings user={user} />}
          {feature === "account" && <Account user={user} />}
          {feature === "favs" && <Favs user={user} />}
          {feature === "reviews" && <Reviews user={user} setFeature={setFeature} />}
          {feature === "reviewEdit" && <ReviewForm user={user}/>}
        </div>
      </div>
    </div>
  );
}
export default User
