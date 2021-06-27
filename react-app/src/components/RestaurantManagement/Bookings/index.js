import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getAcceptedBookings, getPendingBookings, getCancelledBookings, updateBooking } from "../../../store/booking";
import "./Bookings.css";

const Bookings = () => {
    const dispatch = useDispatch();
    const accepted = useSelector(state => state.booking.accepted);
    const pending = useSelector(state => state.booking.pending);
    const cancelled = useSelector(state => state.booking.cancelled);
    const [loaded, setLoaded] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            dispatch(getAcceptedBookings(id))
            dispatch(getPendingBookings(id))
            dispatch(getCancelledBookings(id))
            setLoaded(true);
        })();
    }, [dispatch])


    const handleBookingChange = (bookingId, status) => {
        (async () => {
            dispatch(updateBooking(bookingId, status, id))
            // dispatch(getAcceptedBookings(id))
            // dispatch(getPendingBookings(id))
            // dispatch(getCancelledBookings(id))
        })();   
    }

    function dateToString(dateIn) {
    let date = new Date(dateIn);
    let hour = date.getHours();
    let minute = addZero(date.getMinutes());
    let AMPM = "AM";
    let month = addZero(date.getMonth() + 1);
    let day = addZero(date.getDate());
    let year = date.getFullYear();

    let hourCheck = parseInt(hour);

    if (hourCheck > 12) {
        AMPM = "PM";
        hour = hourCheck - 12;
    }
    else if (hourCheck === 0) {
        hour = "12";
    }

    

    return hour + ":" + minute + " " + AMPM + " " + month + "-" + day + "-" + year

    }

    function addZero(value) {
        return (value < 10) ? "0" + value : value;
    }

    if (!loaded) {
        return null;
    }

    return (
        <><div className="bookings-header"><div className="bookings-header-title">Manage Reservations</div><hr></hr></div>
        <div className="booking-tables-container">
            <div className="pending-bookings-table">
                <div className="pending-bookings-header"><div className="pending-bookings-header-title">Pending Reservations</div><hr></hr></div>
                <table className="pending-bookings-table">
                    <tr className="first-row-booking-table">
                        <th className="accepted-res-res-time-col">Reservation Time</th>
                        <th className="accepted-res-res-gues-col">Guest Name</th>
                        <th>Number of Guests</th>
                        <th>Accept Booking</th>
                        <th>Cancel Booking</th>
                    </tr>
                    {Object.keys(pending).map((key) => {


                        return (
                            <tr className="pending-booking-row">
                                <td>{dateToString(pending[key].booked_for)}</td>
                                <td>{pending[key].username}</td>
                                <td>{pending[key].party_size}</td>
                                <td><input type="checkbox" checked={false} onClick={() => handleBookingChange(pending[key].id, 1)}></input></td>
                                <td><input type="checkbox" checked={false} onClick={() => handleBookingChange(pending[key].id, -1)}></input></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
            
            
            
            
            <div className="accepted-bookings-table">
                <div className="accepted-bookings-header"><div className="accepted-bookings-header-title">Accepted Reservations</div><hr></hr></div>
                <table className="accepted-bookings-table">
                    <tr>
                        <th>Reservation Time</th>
                        <th>Guest Name</th>
                        <th>Number of Guests</th>
                        <th>Cancel Booking</th>
                    </tr>
                    {Object.keys(accepted).map((key) => {

                        return (
                            <tr className="accepted-booking-row">
                                <td>{dateToString(accepted[key].booked_for)}</td>
                                <td>{accepted[key].username}</td>
                                <td>{accepted[key].party_size}</td>
                                <td><input type="checkbox" checked={false} onClick={() => handleBookingChange(accepted[key].id, -1)}></input></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
            
            <div className="cancelled-bookings-table">
                <div className="accepted-bookings-header"><div className="accepted-bookings-header-title">Cancelled Reservations</div><hr></hr></div>
                <table className="cancelled-bookings-table">
                    <tr>
                        <th>Reservation Time</th>
                        <th>Guest Name</th>
                        <th>Number of Guests</th>
                        <th className="resize-column">Un-Cancel Booking</th>
                    </tr>
                    {Object.keys(cancelled).map((key) => {


                        return (
                            <tr className="cancelled-booking-row">
                                <td>{dateToString(cancelled[key].booked_for)}</td>
                                <td>{cancelled[key].username}</td>
                                <td>{cancelled[key].party_size}</td>
                                <td><input type="checkbox" checked={false} onClick={() => handleBookingChange(cancelled[key].id, 0)}></input></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
        </>
    )
}

export default Bookings;

