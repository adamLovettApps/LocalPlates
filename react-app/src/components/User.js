import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getUser, editUser } from "../store/user"
import "./User.css"

function User() {
  // const [user, setUser] = useState({});
  // Notice we use useParams here instead of getting the params
  // From props.
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(state => state.user)
  const sessionUser = useSelector(state => state.session.user)
  const [feature, setFeature] = useState("account")
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState("")
  const [photo, setPhoto] = useState("")
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [reviewList, setReviewList] = useState([])
  const [favsList, setFavs] = useState([])
  const [bookingsList, setBookings] = useState([])
  const [errors, setErrors] = useState([])

  const updateFeature = (stri) => {
    setFeature(stri)
  }
  const updateUsername = (stri) => {
    setUsername(stri)
  }
  const updatePhoto = (stri) => {
    setPhoto(stri)
  }

  const updatePassword = (stri) => {
    setPassword(stri)
  }

  const updateConfirm = (stri) => {
    setConfirm(stri)
  }

  const updateEmail = (stri) => {
    setEmail(stri)
  }
  useEffect(() => {

    if (Number(userId) !== sessionUser.id) {
      return Redirect(`/users/${sessionUser.id}`)
    }

    dispatch(getUser(sessionUser.id))

  }, [dispatch]);


  function Bookings() {
    useEffect(() => {
      let newBookings = [];
      for (let key in user.bookings) {
        newBookings.push(user.bookings[key])
      }
      if (!bookingsList.length) {
        setBookings(newBookings)
      }
    }, [dispatch])
    return (
      <>
        <h2>Your Upcoming Reservations: </h2>
        {bookingsList.map(booking =>
          <div>
            <h3>{booking.id}</h3>
          </div>
        )}
      </>
    )
  }

  const onEditUser = async (e) => {
    e.preventDefault();
    const newUser = { id: user.id, errors: [] }

    if (password === confirm && password.length > 0) {
      newUser.password = password
    }
    else newUser.errors.push("You must provide a Password and matching Confirm Password.")
    if (photo.length) {
      newUser.photo = photo
    }
    if (email.length && email !== user.email) {
      newUser.email = email
    }
    if (username.length && username !== user.username) {
      newUser.username = username
    }
    const res = await dispatch(editUser(newUser))
    if (res.errors.length) {
      let newErrors = [...errors, ...res.errors]
      setErrors(newErrors)
    }
  }

  function Account() {
    return (
      <div className="account-info-wrapper">
        <h2>About me: </h2>
        <img href="user.profile_photo" />
        <div className="form-wrapper">
          <form className="edit-user-form" onSubmit={onEditUser}>
            <div>
              <label htmlFor="username">Username: </label>
              <input type="text" id="username" name="username" value={username} onChange={(e) => updateUsername(e.target.value)} />
            </div>
            <div>
              <label htmlFor="email">Email Address: </label>
              <input type="email" id="email" name="email" value={email} onChange={(e) => updateEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="profile_photo">Profile Photo URL: </label>
              <input type="profile_photo" id="profile_photo" name="profile_photo" value={photo} onChange={(e)=>updatePhoto(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="password">Change Password: </label>
              <input id="password" name="password" type="password" value={password} onChange={(e) => updatePassword(e.target.value)} />
            </div>
            <div><label htmlFor="confirm">Confirm Password: </label>
              <input type="password" id="confirm" value={confirm} onChange={(e) => updateConfirm(e.target.value)} />
            </div>
            <div className="button"><button>Save Changes</button></div>
          </form>
        </div>
      </div>
    )
  }

  function Favs() {

    useEffect(() => {
      let newFavs = [];
      for (let key in user.favorites) {
        newFavs.push(user.favorites[key])
      }
      if (!favsList.length) {
        setFavs(newFavs)
      }
    }, [dispatch])

    return (

      <div>
        <h2>Your Favorite Restaurants: </h2>
        {favsList.map(fav =>
          <div key={fav.id}>
            <h4>{fav.restaurant_id}</h4>
          </div>
        )}
      </div>

    )
  }

  function Reviews() {
    useEffect(() => {
      let newReviews = [];
      for (let key in user.reviews) {
        newReviews.push(user.reviews[key])
      }
      if (!reviewList.length) {
        setReviewList(newReviews)
      }
    }, [dispatch])

    return (
      <>
        <div className="review-wrapper">
          <h2>Your Reviews: </h2>
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
          {feature === "bookings" && <Bookings />}
          {feature === "account" && <Account />}
          {feature === "favs" && <Favs />}
          {feature === "reviews" && <Reviews />}
        </div>
      </div>
    </div>
  );
}
export default User
