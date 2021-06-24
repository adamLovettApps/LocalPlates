import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getUser } from "../store/user"


function User() {
  // const [user, setUser] = useState({});
  // Notice we use useParams here instead of getting the params
  // From props.
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(state => state.user)
  const sessionUser = useSelector(state => state.session.user)
  const [feature, setFeature] = useState("")
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [reviewList, setReviewList] = useState([])

  const updateFeature = (stri) => {
    setFeature(stri)
  }
  const updateUsername = (stri) => {
    setUsername(stri)
  }

  useEffect(() => {

    if (Number(userId) !== sessionUser.id) {
      return Redirect(`/users/${sessionUser.id}`)
    }
    dispatch(getUser(sessionUser.id))

  }, [dispatch]);


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
        <div className="form-wrapper">
          <form className="edit-details-form">
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" name="username" value={user.username} onChange={(e) => updateUsername(e.target.value)} />
          </form>
        </div>
      </>
    )
  }

  function Favs() {

    return (
      <>
        <h2>Your Favorite Restaurants: </h2>
        {/* {user.favorites && user.favorites.map(favorite => <li key="favorite">{favorite.id}</li>)} */}
      </>
    )
  }

  function Reviews() {
    console.log("=========================>", user.reviews, reviewList)
    useEffect(() => {
      let newReviews = [];
      for (var key in user.reviews) {
        console.log(key)
        console.log(user.reviews[key])
        newReviews.push(user.reviews[key])
      }
      setReviewList(newReviews)

    }, [user])
    return (
      <>
        <div className="review-wrapper">
          {reviewList.map(review =>
            <div key={review.id}>
              <h3>{review.title}<span>{review.stars} Stars</span></h3>
              <p>{review.body}</p>
            </div>
          )}
        </div>
      </>
    )
  }


  if (Number(userId) !== sessionUser.id) {
    return Redirect(`/users/${sessionUser.id}`);
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
        <p onClick={() => updateFeature("reviews")}>Reviews</p>
      </div>
      <div className="profile-feature">
        {feature === "bookings" && <Bookings />}
        {feature === "account" && <Account />}
        {feature === "favs" && <Favs />}
        {feature === "reviews" && <Reviews />}
      </div>
    </div>
  );
}
export default User
