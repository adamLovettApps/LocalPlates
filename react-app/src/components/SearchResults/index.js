import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSearchResults } from "../../store/search"
import SearchRestultCard from "../SearchResultCard";
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
    const { searchString } = useParams();


    useEffect(() => {
        (async() => {
            let ip = await getIPInfo();
            dispatch(getSearchResults(ip, searchString));
            console.log(currentResults);
            setLoaded(true);
        })();
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <>
        <div className="header-container">
            <div className="search-term-container"><h1>You Searched For "{searchString.substring(1)}"</h1></div>
            
                {Object.keys(currentResults).map(key => <SearchRestultCard className="restaurant-search-card" restaurant={currentResults[key]}></SearchRestultCard>)}
                
            
        </div>
        </>
    )

}

export default SearchResults;