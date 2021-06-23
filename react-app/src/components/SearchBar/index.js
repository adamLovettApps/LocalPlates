import React, { useState, useEffect } from "react";
import "./SearchBar.css"
function SearchBar(){
    const handleSubmit = (e) => {

    }
    const [date,setDate] = useState(Date())
    const [time,setTime] = useState(Date().now)
    const [partySize, setPartySize] = useState(2);
    const [searchString, setSearchString] = useState('');

    //clear date and time from prev searches
    useEffect(()=>{
        localStorage.setItem('myDate', '');
        localStorage.setItem('myTime', '');

    },[])
    useEffect(()=>{
        localStorage.setItem('myDate', date);
        localStorage.setItem('myTime', time);
    },[date,time])
    return(
        <>
        <form action = {`/search/:${searchString}`} method="get" className="search-form">
                <div className="booking-params">
                    <input type='date'
                        className= 'search-form-ele search-date'
                        placeholder='date'
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                        required
                    >
                    </input>
                    <input type='time'
                        className= 'search-form-ele search-time'
                        step="60"
                        placeholder='time'
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                        required
                    >
                    </input>
                    <label className='search-person-icon'>
                        <i className="fas fa-user-alt"></i>
                    </label>
                    <select
                    className="search-party-size"
                    >
                        <option>
                             2 People
                        </option>
                    </select>
                    <label className="search-icon">
                        <i class="fas fa-search"></i>
                    </label>
                    <input className="search-form-ele search-input-field"
                        placeholder="Search by Restaurant, Cuisine Type, or Location"
                        onChange={(e) => setSearchString(e.target.value)}
                        required
                    >
                    </input>
                    <button className='search-button home-form-ele' type='submit'>Let's Eat</button>
                </div>
            </form>
        </>
    )
}
export default SearchBar
