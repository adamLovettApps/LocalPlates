import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import "./BookingCard.css";

function formatDate(date) {
    let cuurent = new Date();
    let month = '' + (cuurent.getMonth() + 1);
    let day = '' + cuurent.getDate();
    let year = cuurent.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

const BookingCard = () => {
    useEffect(() => {
        let currentDate = formatDate();

        setDate(currentDate);
    }, [] )

    const [date,setDate] = useState()
    const [time,setTime] = useState("11:00:00")
    const [partySize, setPartySize] = useState(2);
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector(state => state.session.user)
    const {id} = useParams();
    const handleSubmit = (e) => {
        e.preventDefault();
        (async() => {

            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    restaurant_id: id,
                    user_id: user.id,
                    booking_day: date,
                    booking_time: time,
                    party_size: partySize
                })
            }
            )
            setSubmitted(true);
        })();
    }
    if (user) {
        if (!submitted) {
        return (
            <div className="booking-card-container">
                <div className="booking-title">Make a reservation</div>
                <div className="divider1"><hr className="divider"></hr></div>
                <form>
                    <div className="party-size">Party Size</div>
                    <div className="for-select">
                        <select className="people-select" 
                            onChange={(e)=>{
                            setPartySize(e.target.value)
                            }}
                            value = {partySize}
                        >
                            <option selected="" value="1">For 1</option>
                            <option value="2">For 2</option>
                            <option value="3">For 3</option>
                            <option value="4">For 4</option>
                            <option value="5">For 5</option>
                            <option value="6">For 6</option>
                            <option value="7">For 7</option>
                            <option value="8">For 8</option>
                            <option value="9">For 9</option>
                            <option value="10">For 10</option>
                            <option value="11">For 11</option>
                            <option value="12">For 12</option>
                            <option value="13">For 13</option>
                            <option value="14">For 14</option>
                            <option value="15">For 15</option>
                            <option value="16">For 16</option>
                            <option value="17">For 17</option>
                            <option value="18">For 18</option>
                            <option value="19">For 19</option>
                            <option value="20">For 20</option>
                            
                        </select>
                    </div>
                    <div className="divider2"></div>
                    <div className="date">Date</div>
                    <div className="date-select">
                        <input type="date" onChange={(e) => {setDate(e.target.value);}}
                            value={date}
                            required></input>
                    </div>
                    <div className="time">Time</div>
                    <div clasName="time-select">
                        <select className="time-select" 
                            onChange={(e) => setTime(e.target.value)}
                            value={time}
                            required
                        >
                            <option selected="" value="11:00:00">11:00 AM &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                            <option value="11:30:00">11:30 AM</option>
                            <option value="12:00:00">12:00 PM</option>
                            <option value="12:30:00">12:30 PM</option>
                            <option value="13:00:00">1:00 PM</option>
                            <option value="13:30:00">1:30 PM</option>
                            <option value="14:00:00">2:00 PM</option>
                            <option value="14:30:00">2:30 PM</option>
                            <option value="15:00:00">3:00 PM</option>
                            <option value="15:30:00">3:30 PM</option>
                            <option value="16:00:00">4:00 PM</option>
                            <option value="16:30:00">4:30 PM</option>
                            <option value="17:00:00">5:00 PM</option>
                            <option value="17:30:00">5:30 PM</option>
                            <option value="18:00:00">6:00 PM</option>
                            <option value="18:30:00">6:30 PM</option>
                            <option value="19:00:00">7:00 PM</option>
                            <option value="19:30:00">7:30 PM</option>
                            <option value="20:00:00">8:00 PM</option>
                            <option value="20:30:00">8:30 PM</option>
                            <option value="21:00:00">9:00 PM</option>
                            <option value="21:30:00">9:30 PM</option>
                            <option value="22:00:00">10:00 PM</option>
                            <option value="22:30:00">10:30 PM</option>
                            <option value="23:00:00">11:00 PM</option>
                        
                        </select>
                    </div>

                    <div className="divider3"><hr className="divider"></hr></div>
                    <div className="book-button-container"><button className="book-button" onClick={handleSubmit}>Book a table</button></div>
                </form>
            </div>
        )
        } else {
            return (
            <div className="booking-card-container">
                <div className="booking-title">Make a reservation</div>
                <div className="divider1"><hr className="divider"></hr></div>
                <form>
                    <div className="party-size">Party Size</div>
                    <div className="for-select">
                        <select className="people-select" 
                            onChange={(e)=>{
                            setPartySize(e.target.value)
                            }}
                            value = {partySize}
                        >
                            <option selected="" value="1">For 1</option>
                            <option value="2">For 2</option>
                            <option value="3">For 3</option>
                            <option value="4">For 4</option>
                            <option value="5">For 5</option>
                            <option value="6">For 6</option>
                            <option value="7">For 7</option>
                            <option value="8">For 8</option>
                            <option value="9">For 9</option>
                            <option value="10">For 10</option>
                            <option value="11">For 11</option>
                            <option value="12">For 12</option>
                            <option value="13">For 13</option>
                            <option value="14">For 14</option>
                            <option value="15">For 15</option>
                            <option value="16">For 16</option>
                            <option value="17">For 17</option>
                            <option value="18">For 18</option>
                            <option value="19">For 19</option>
                            <option value="20">For 20</option>
                            
                        </select>
                    </div>
                    <div className="divider2"></div>
                    <div className="date">Date</div>
                    <div className="date-select">
                        <input type="date" onChange={(e) => setDate(e.target.value)}
                            value={date}
                            required></input>
                    </div>
                    <div className="time">Time</div>
                    <div clasName="time-select">
                        <select className="time-select" 
                            onChange={(e) => setTime(e.target.value)}
                            value={time}
                            required
                        >
                            <option selected="" value="11:00:00">11:00 AM &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                            <option value="11:30:00">11:30 AM</option>
                            <option value="12:00:00">12:00 PM</option>
                            <option value="12:30:00">12:30 PM</option>
                            <option value="13:00:00">1:00 PM</option>
                            <option value="13:30:00">11:30 PM</option>
                            <option value="14:00:00">2:00 PM</option>
                            <option value="14:30:00">2:30 PM</option>
                            <option value="15:00:00">3:00 PM</option>
                            <option value="15:30:00">3:30 PM</option>
                            <option value="16:00:00">4:00 PM</option>
                            <option value="16:30:00">4:30 PM</option>
                            <option value="17:00:00">5:00 PM</option>
                            <option value="17:30:00">5:30 PM</option>
                            <option value="18:00:00">6:00 PM</option>
                            <option value="18:30:00">6:30 PM</option>
                            <option value="19:00:00">7:00 PM</option>
                            <option value="19:30:00">7:30 PM</option>
                            <option value="20:00:00">8:00 PM</option>
                            <option value="20:30:00">8:30 PM</option>
                            <option value="21:00:00">9:00 PM</option>
                            <option value="21:30:00">9:30 PM</option>
                            <option value="22:00:00">10:00 PM</option>
                            <option value="22:30:00">10:30 PM</option>
                            <option value="23:00:00">11:00 PM</option>
                        
                        </select>
                    </div>

                    <div className="divider3"><hr className="divider"></hr></div>
                    <div className="book-button-container"><button className="book-button" onClick={((e) => e.preventDefault())}>Booking set!</button></div>
                </form>
            </div>
        )
        }
    } else {
        return (
            <div className="booking-card-container">
                <div className="booking-title">Make a reservation</div>
                <div className="divider1"><hr className="divider"></hr></div>
                <form>
                    <div className="party-size">Party Size</div>
                    <div className="for-select">
                        <select className="people-select" 
                            onChange={(e)=>{
                            setPartySize(e.target.value)
                            }}
                            value = {partySize}
                        >
                            <option selected="" value="1">For 1</option>
                            <option value="2">For 2</option>
                            <option value="3">For 3</option>
                            <option value="4">For 4</option>
                            <option value="5">For 5</option>
                            <option value="6">For 6</option>
                            <option value="7">For 7</option>
                            <option value="8">For 8</option>
                            <option value="9">For 9</option>
                            <option value="10">For 10</option>
                            <option value="11">For 11</option>
                            <option value="12">For 12</option>
                            <option value="13">For 13</option>
                            <option value="14">For 14</option>
                            <option value="15">For 15</option>
                            <option value="16">For 16</option>
                            <option value="17">For 17</option>
                            <option value="18">For 18</option>
                            <option value="19">For 19</option>
                            <option value="20">For 20</option>
                            
                        </select>
                    </div>
                    <div className="divider2"></div>
                    <div className="date">Date</div>
                    <div className="date-select">
                        <input type="date" onChange={(e) => setDate(e.target.value)}
                            value={date}
                            required></input>
                    </div>
                    <div className="time">Time</div>
                    <div clasName="time-select">
                        <select className="time-select" 
                            onChange={(e) => setTime(e.target.value)}
                            value={time}
                            required
                        >
                            <option selected="" value="11:00:00">11:00 AM &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                            <option value="11:30:00">11:30 AM</option>
                            <option value="12:00:00">12:00 PM</option>
                            <option value="12:30:00">12:30 PM</option>
                            <option value="13:00:00">1:00 PM</option>
                            <option value="13:30:00">11:30 PM</option>
                            <option value="14:00:00">2:00 PM</option>
                            <option value="14:30:00">2:30 PM</option>
                            <option value="15:00:00">3:00 PM</option>
                            <option value="15:30:00">3:30 PM</option>
                            <option value="16:00:00">4:00 PM</option>
                            <option value="16:30:00">4:30 PM</option>
                            <option value="17:00:00">5:00 PM</option>
                            <option value="17:30:00">5:30 PM</option>
                            <option value="18:00:00">6:00 PM</option>
                            <option value="18:30:00">6:30 PM</option>
                            <option value="19:00:00">7:00 PM</option>
                            <option value="19:30:00">7:30 PM</option>
                            <option value="20:00:00">8:00 PM</option>
                            <option value="20:30:00">8:30 PM</option>
                            <option value="21:00:00">9:00 PM</option>
                            <option value="21:30:00">9:30 PM</option>
                            <option value="22:00:00">10:00 PM</option>
                            <option value="22:30:00">10:30 PM</option>
                            <option value="23:00:00">11:00 PM</option>
                        
                        </select>
                    </div>

                    <div className="divider3"><hr className="divider"></hr></div>
                    <div className="book-button-container"><button className="book-button" onClick={((e) => e.preventDefault())}>Sign in to book</button></div>
                </form>
            </div>
        )
    }
}

export default BookingCard;