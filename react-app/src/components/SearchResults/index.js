import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSearchResults } from "../../store/search"

const getIPInfo = async () => {
        let res = await fetch('https://ipapi.co/json/');
        let ip = await res.json();
        // let apiKey = process.env.REACT_APP_IPAPI_KEY;
        // console.log("APIKEY!!!!!", apiKey)
        // let locres = await fetch(`https://api.ipapi.com/api/${ip.ip}?access_key=${apiKey}`)
        // let location = await locres.json();
        // console.log(ip);
        // console.log(location);
        return ip;
    }


const SearchResults = () => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const user = useSelector(state => state.search.results);
    const { searchString } = useParams();


    useEffect(() => {
        (async() => {
            let ip = await getIPInfo();
            dispatch(getSearchResults(ip, searchString));
            setLoaded(true);
        })();
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <>
        HIT!
        </>
    )

}

export default SearchResults;