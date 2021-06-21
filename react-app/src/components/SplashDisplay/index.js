import React, { useState, useEffect } from "react";

function SplashDisplay(){
    const handleSubmit = (e) => {

    }
    const [date,setDate] = useState(Date())
    const [time,setTime] = useState(Date().now)
    const [searchTerm, setSearchTerm] = useState('');


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
        <div className="splash-background">
            <h1>Find a Seat For a Local Plate!</h1>
            <form action = {`/search/:${searchTerm}`} method="get">
                <div className="booking-params">
                    <input type='date'
                        placeholder='date'
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                        required
                    >
                    </input>
                    <input type='time'
                        step="60"
                        placeholder='time'
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                        required
                    >
                    </input>
                    <input className="home-page-search"
                        placeholder="Search by Restaurant, Cuisine Type, or Location"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required
                    >
                    </input>
                    <button className='submit-search' type='submit'>Search</button>
                </div>
            </form>
        </div>
    )
}

export default SplashDisplay;
