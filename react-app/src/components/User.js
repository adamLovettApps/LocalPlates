import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getUser, editUser } from "../store/user"
import "./User.css"
import StarRating from "./StarRating"
import CardScroll from './CardScroll'


function User() {
  // const [user, setUser] = useState({});
  // Notice we use useParams here instead of getting the params
  // From props.
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(state => state.user)
  const sessionUser = useSelector(state => state.session.user)
  const [feature, setFeature] = useState("bookings")
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [photo, setPhoto] = useState(user.photo)
  const [password, setPassword] = useState(user.password)
  const [confirm, setConfirm] = useState(user.password)
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
    if (!user.id) {
      dispatch(getUser(sessionUser.id))
    }

  }, [dispatch]);


  useEffect(() => {
    if (!bookingsList.length) {
      let newBookings = [];
      for (let key in user.bookings) {
        newBookings.push(user.bookings[key])
      }
      setBookings(newBookings)
    }

    if (!favsList.length) {
      let newFavs = [];
      for (let key in user.favorites) {
        newFavs.push(user.favorites[key])
      }
      setFavs(newFavs)
    }

    if (!reviewList.length) {

      let newReviews = [];
      for (let key in user.reviews) {
        newReviews.push(user.reviews[key])
      }
      setReviewList(newReviews)
    }

  }, [user])

  function Bookings() {
    return (

      <div>
        <h2>Your Upcoming Reservations: </h2>
        {bookingsList.map(booking =>
          <div className="restaurant-wrapper">
            <h3>{booking.restaurant.name}<span><StarRating rating={booking.restaurant.star_rating} reviewNum={booking.restaurant.review_count} /></span></h3>
            <div className="separator">
              <div className="restaurant-photo">
                <img src={booking.restaurant.profile_photo} />
              </div>
              <div className="reservation-details">
                <div>
                  Reservation for: {booking.booked_for}
                </div>
                  Status:
                  {booking.confirmation_status === 0 && <div>Pending</div>}
                  {booking.confirmation_status === 1 && <div>Approved</div>}
                  {booking.confirmation_status === 2 && <div>Cancelled</div>}
                <div>
                  {booking.party_size} People
                </div>
              </div>
              <div>
                <div classname="restaurant-data">
                  <div className="description">{booking.restaurant.description}</div>
                  <div>
                    {booking.restaurant.phone_number}
                  </div>
                  <div>
                    {booking.restaurant.address} {booking.restaurant.city}, {booking.restaurant.state}  {booking.restaurant.zipcode}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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
          <form className="edit-user-form" onSubmit={onEditUser} action={`/api/users/${sessionUser.id}`}>
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
              <input type="profile_photo" id="profile_photo" name="profile_photo" value={photo} onChange={(e) => updatePhoto(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password">Change Password: </label>
              <input id="password" name="password" type="password" value={password} onChange={(e) => updatePassword(e.target.value)} />
            </div>
            <div>
              <label htmlFor="confirm">Confirm Password: </label>
              <input type="password" id="confirm" value={confirm} onChange={(e) => updateConfirm(e.target.value)} />
            </div>
            <div className="button"><button>Save Changes</button></div>
          </form>
        </div>
      </div>
    )
  }

  function Favs() {

    return (

      <div>
        <CardScroll order={1} collectionTitle="Favorite Restaurants" restaurants={favsList} />
      </div>

    )
  }

  function Reviews() {

    return (
      <>
        <div className="review-wrapper">
          <h2>Your Reviews: </h2>
          {reviewList.map(review =>
            <div key={review.id} className="review-body">
              <div className="review-title">
                <h3>{review.title}</h3>
                <div className='rating-span'>
                  {review.stars > 0 ? <span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
                  {review.stars > 1 ? <span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
                  {review.stars > 2 ? <span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
                  {review.stars > 3 ? <span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
                  {review.stars > 4 ? <span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
                  <div className="star-rating-num"> {review.stars} Stars</div>
                </div>
              </div>
              <p>{review.body}</p>
              <button className="buttons">Edit</button>
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
