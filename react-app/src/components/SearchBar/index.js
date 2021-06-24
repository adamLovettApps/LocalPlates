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
        localStorage.setItem('myPartySize', '');

    },[])
    useEffect(()=>{
        localStorage.setItem('myDate', date);
        localStorage.setItem('myTime', time);
        localStorage.setItem('myPartySize', partySize);
    },[date,time,partySize])
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
                    onChange={(e)=>{
                        setPartySize(e.target.value)
                    }}
                    value = {partySize}
                    >
                            <option key={1} value={1}> 1 Person </option>
                            <option selected={true} key={2}  value={2}> 2 People </option>
                            <option key={3} value={3}> 3 People </option>
                            <option key={4} value={3}> 3 People </option>
                            <option key={5} value={3}> 3 People </option>
                            <option key={6} value={3}> 3 People </option>
                            <option key={7} value={7}> 7 People </option>
                            <option key={8} value={8}> 8 People </option>
                            <option key={9} value={9}> 9 People </option>
                            <option key={10} value={10}> 10 People </option>
                            <option key={11} value={11}> 11 People </option>
                            <option key={12} value={12}> 12 People </option>
                            <option key={13} value={13}> 13 People </option>
                            <option key={14} value={14}> 14 People </option>
                            <option key={15} value={15}> 15 People </option>
                            <option key={16} value={16}> 16 People </option>
                            <option key={17} value={17}> 17 People </option>
                            <option key={18} value={18}> 18 People </option>
                            <option key={19} value={19}> 19 People </option>
                            <option key={20} value={20}> 20 People </option>
                    </select>
                    <label className="search-icon">
                        <i className="fas fa-search"></i>
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
