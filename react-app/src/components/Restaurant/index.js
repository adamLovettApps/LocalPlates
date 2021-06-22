import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {getRestaurant} from "../../store/restaurant";

const Restaurant = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    const sessionUser = useSelector(state => state.session.user)
    const restaurant = useSelector(state => state.restaurant)

    const [currentRestaurant, setRestaurant] = useState();

    useEffect(() => {
        dispatch(getRestaurant(id));
    }, [dispatch, id])

    useEffect(() => {
        if (!currentRestaurant) {
            setRestaurant(restaurant);
        }
    }, [currentRestaurant])
}
