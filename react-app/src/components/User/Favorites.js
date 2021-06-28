import React, { useState, useEffect } from "react";
import {useDispatch} from 'react-redux'
import CardScroll from '../CardScroll'



function Favs({ user }) {
    const dispatch = useDispatch()
    const [favsList, setFavs] = useState([])

    useEffect(() => {
        if (!favsList.length) {
            let newFavs = [];
            for (let key in user.favorites) {
                newFavs.push(user.favorites[key])
            }
            setFavs(newFavs)
        }
    }, [user, dispatch])


    return (

        <div>
            <CardScroll order={1} collectionTitle="Favorite Restaurants" restaurants={favsList} />
        </div>

    )
}

export default Favs;
