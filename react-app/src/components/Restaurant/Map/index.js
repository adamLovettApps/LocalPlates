import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {getRestCoordinates} from "../../../store/coordinates";
import "./Map.css";

const Map = () => {
    const [loaded, setLoaded] = useState(false);
    const {id } = useParams()
    const dispatch = useDispatch();
    const restaurant = useSelector(state => state.restaurant.restaurant)
    const coordinates = useSelector(state => state.coordinates.coordinates)
    console.log("REST", restaurant.state);


    useEffect(() => {

        (async() => {
            dispatch(getRestCoordinates(id));
            setLoaded(true);
            }
        )();
    }, []);


    if (!loaded) {
        return null;
    }

    if (coordinates) {
        const style = {        
        height: '300px',
        width: "100%"};
    
        const position = {
            lat: coordinates.lat, lng: coordinates.lng
        }
    return (

        <LoadScript
        googleMapsApiKey='AIzaSyCAphw4xQ-daizoZ-YdCp4-C6_gSnTHMsQ'>
            <div className = "map-container-in-component">
            <GoogleMap
            mapContainerStyle={style}
            zoom={13}
            center={position}> 

                <Marker key="marker_1"

                    position={{

                        lat: position.lat,

                        lng: position.lng

                    }}

                />

            </GoogleMap>
            </div>
        </LoadScript>
    )
    } else {
        return null
    }

}

export default Map;