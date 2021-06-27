import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRestaurantPhotos } from '../../../../store/photo'
import { removeRestaurantPhoto } from "../../../../store/photo"
import "./PhotoGallery.css"


const PhotoGallery = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loaded, setLoaded] = useState(false);
    const photos = useSelector(state => state.photos.photos)

    useEffect(() => {
        (async () => {
            dispatch(getRestaurantPhotos(id))
            setLoaded(true);
        })();
    }, [dispatch])

    const clickHandler = async(photoId) => {
        dispatch(removeRestaurantPhoto(photoId, id))
        dispatch(getRestaurantPhotos(id))
    }

    if (!loaded) {
        return null;
    }

    let urls = [];

    if (photos[0]) {

        let url;
        let containerName;
        console.log("PHOTO0", photos[0])
        
        return (
                <>
                    <div className="restaurant-management-photo-container-wrapper">
                        <div className="restaurant-management-photo-container">
                            {Object.keys(photos).map((photo) => {

                                {   const baseURL = photos[photo].image.split('/')[3];;
                                    const imageRequest = JSON.stringify({
                                                    bucket: "localplates",
                                                    key: baseURL,
                                                    edits: {
                                                        
                                                        resize: {
                                                            width: 150,
                                                            height: 150,
                                                            fit: "cover"
                                                        }
                                                    }
                                                })
                                    const encoded = btoa(imageRequest);
                                    url = `https://d3tzg5ntrh3zgq.cloudfront.net/${encoded}`;
                                }
                                {containerName = `delete-icon-container-${photos[photo].id}`}
                                {console.log("CONTAINER", {containerName})}
                                return (
                                    <>
                                    <span className="restaurant-management-photo">
                                        <img src={url} className="restaurant-management-photo-img"></img>
                                    </span>
                                        <div className='delete-icon-container'>
                                            <i className="fas fa-times-circle delete-image-icon"  onClick={(() => clickHandler(photos[photo].id))}>
                                            </i>
                                        </div>
                                    </>
                                )
                            })}
                        </div>  
                    </div>
                </>
            )
    }else {
        return null;
    }
}

export default PhotoGallery;