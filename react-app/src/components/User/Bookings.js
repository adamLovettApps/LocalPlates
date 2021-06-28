import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import StarRating from "../StarRating"



function Bookings({ user }) {

    const dispatch = useDispatch();
    const [bookingsList, setBookings] = useState([])

    useEffect(() => {
        if (!bookingsList.length) {
            let newBookings = [];
            for (let key in user.bookings) {
                newBookings.push(user.bookings[key])
            }
            setBookings(newBookings)
        }
    }, [user, dispatch])

    return (
        <div>
            <h2 className="head-title">Your Upcoming Reservations: </h2>
            {bookingsList.map(booking =>
                <div className="restaurant-wrapper">
                    <div className="title-wrapper">
                        <h3>{booking.restaurant.name}</h3>
                        <StarRating rating={booking.restaurant.star_rating} reviewNum={booking.restaurant.review_count} />
                    </div>
                    <div className="separator">
                        {/* <div className="restaurant-photo">
                <img src={booking.restaurant.profile_photo} />
              </div> */}
                        <div className="reservation-details">
                            <div className="reservation-date">
                                {booking["booked-for"]}{/* removed .split(" ").slice(0, 4).join(" ") */}
                            </div>
                        </div>

                        <div className="description">{booking.restaurant.description}</div>

                    </div>
                    <div className="details">
                        <div>
                            {booking.party_size} People
                        </div>
                        <div>
                            {booking.restaurant.phone_number}
                        </div>
                        <div>
                            {booking.restaurant.address} {booking.restaurant.city},
                            {booking.restaurant.state}  {booking.restaurant.zipcode}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Bookings;
