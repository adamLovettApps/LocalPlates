import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { getSearchResults } from "../../store/search"
import SearchRestultCard from "../SearchResultCard";
import SearchBar from "../SearchBar";
import SearchFilter from "../SearchFilter";
import "./SearchResults.css"

const getIPInfo = async () => {
        let res = await fetch('https://ipapi.co/json/');
        let ip = await res.json();
        return ip;
    }


const SearchResults = () => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const currentResults = useSelector(state => state.search.currentResults);
    const user = useSelector(state => state.session.user)
    const { searchString } = useParams();
    let tags;

    useEffect(() => {
        (async() => {
            let ip = await getIPInfo();
            dispatch(getSearchResults(ip, searchString));
            let res = await fetch('/api/search/getTags');
            tags = await res.json();
            setLoaded(true);
        })();
    }, []);

    if (user) {
        if (user.is_owner) {

            return <Redirect to={`/restaurantmanagement/${user.restaurant_id}`}></Redirect>
        } 
    }

    if (!loaded) {
        return null;
    }
    let count = 0;
    return (
        <>

        <div className="search-bar-container"><SearchBar></SearchBar></div>
        <div className="header-container">
            <div className="search-term-container"><h1>You Searched For "{searchString.substring(1)}"</h1></div>
            <hr className="restaurant-divider"></hr>
            {Object.keys(currentResults).map(key => { 
                if (count < Object.keys(currentResults).length - 1) { 
                    count++; 
                    return (<><SearchRestultCard className="restaurant-search-card" key={uuidv4()} restaurant={currentResults[key]} id={key}></SearchRestultCard><hr key={uuidv4()} className="restaurant-divider"></hr></>) 
                } else {
                    return (<><SearchRestultCard className="restaurant-search-card"  key={uuidv4()} restaurant={currentResults[key]} id={key}></SearchRestultCard></>)
                }
            }
            )}
            
        </div>
        <div className="search-filter-container"><SearchFilter></SearchFilter></div>
        </>
    )

}

export default SearchResults;