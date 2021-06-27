import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getRestaurantPhotos } from "../../../store/photo";

import "./PhotoGallery.css";

const PhotoGallery = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loaded, setLoaded] = useState(false);
    const photos = useSelector(state => state.photos.photos);
    const [photoSlider, setPhotoSlider] = useState(false)
    const [image, setImage] = useState('')
    let images = [];
    let popUpImages = [];
    let popupUrls = []

    const showImage = (image) => {  
        setImage(image);
        setPhotoSlider(true);
    };

    const hideImage = () => {
        setPhotoSlider(false)
    }

    const showNextImage = (e) => {
        e.stopPropagation();
        let currentIndex = popupUrls.indexOf(image)
        let nextImage = popupUrls[currentIndex +1]

        if (currentIndex === popupUrls.length - 1) {
            nextImage = popupUrls[0];
        }
        setImage(nextImage)
    

    }

    const showPrevImage = (e) => {
        e.stopPropagation();
        let prevImage;
        let currentIndex = popupUrls.indexOf(image)
        if (currentIndex === 0) {
            prevImage = popupUrls[popupUrls.length - 1];
        } else {
            prevImage = popupUrls[currentIndex - 1]
        }
        setImage(prevImage)
    }

    useEffect(() => {
        (async () => {
            dispatch(getRestaurantPhotos(id))
            setLoaded(true);
        })();

    }, [dispatch])

    if (!loaded) {

        return null;
    }

    if (photos) {

        let photoLength = Object.keys(photos).length;
        let urls = []
        let width;
        let height;

        if (photos[0]){
            for (let i = 0; i < photoLength; i++){
                if (photoLength === 1) {
                    width = 600;
                    height = 280;
                }
                if (photoLength === 2) {
                    if (i === 0) {
                        width = 400;
                        height = 280
                    } else {
                        width= 195;
                        height=280;
                    }
                }
                if (photoLength === 3) {
                    if (i === 0) {
                        width = 300;
                        height = 280
                    } else  {
                        width = 290;
                        height = 138
                    }
                }
                if (photoLength === 4) {
                    if (i === 0 || i === 3) {
                        width = 195;
                        height = 280
                    } else  {
                        width = 195;
                        height = 136
                    }
                }
                if (photoLength === 5) {
                    if (i === 0 ) {
                        width = 195;
                        height = 280
                    } else  {
                        width = 195;
                        height = 136
                    }
                }

                if (photoLength === 6) {
                    if (i === 0 || i === 5) {
                        width = 195;
                        height = 280
                    } else  {
                        width = 97;
                        height = 136
                    }
                }

                if (photoLength === 7) {
                    if (i === 0 || i === 1 || i===2 || i === 3 ) {
                        width = 195;
                        height = 136;
                    } else  {
                        width = 195;
                        height = 88
                    }
                }
                if (photoLength >= 8) {
                    if (i === 0 || i === 1 || i===2 || i === 3 ) {
                        width = 95;
                        height = 147;
                    } else if (i === 4)  {
                        width = 195;
                        height = 300
                    } else {
                        width = 193;
                        height = 95;
                    }
                }
                const baseURL = photos[i].image.split('/')[3];;
                const imageRequest = JSON.stringify({
                                bucket: "localplates",
                                key: baseURL,
                                edits: {
                                    
                                    resize: {
                                        width: width,
                                        height: height,
                                        fit: "cover"
                                    }
                                }
                            })
                const encoded = btoa(imageRequest);
                const url = `https://d3tzg5ntrh3zgq.cloudfront.net/${encoded}`;
                urls.push(url);
            }
            
            for (let i = 0; i < photoLength; i++){
                const baseURL = photos[i].image.split('/')[3];;
                const imageRequest = JSON.stringify({
                                bucket: "localplates",
                                key: baseURL,
                                edits: {
                                    
                                    resize: {
                                        width: 526,
                                        height: 526,
                                        fit: "cover"
                                    }
                                }
                            })
                const encoded = btoa(imageRequest);
                const url = `https://d3tzg5ntrh3zgq.cloudfront.net/${encoded}`;
                popupUrls.push(url);
            }
        }

        if (photoLength === 1){
            return (<>
                {photoSlider ? 
                    <div className="gallery-img-container" onClick={hideImage}>
                        <button onClick={showPrevImage} className="popup-image-nav-button-left">❮</button>
                            <img class="gallery-img" src={image}></img>
                        <button onClick={showNextImage} className="popup-image-nav-button-right">❯</button>
                    </div> 
                    : ''
                }
                <div className="photo-gallery">
                    <div className="photo-container-header">
                        {`${Object.keys(photos).length} Photos`}
                    </div>
                    <hr className="photo-container-divider"></hr>
                    <div className="photo-container-1">
                        <div><img className="restaurant-page-image" src={urls[0]} onClick={() => showImage(popupUrls[0])}></img></div>
                    </div>
                    
                </div>
                </>
            )
        } else if (photoLength === 2){
            return (
                <>
                {photoSlider ? 
                    <div className="gallery-img-container" onClick={hideImage}>
                        <button onClick={showPrevImage} className="popup-image-nav-button-left">❮</button>
                            <img class="gallery-img" src={image}></img>
                        <button onClick={showNextImage} className="popup-image-nav-button-right">❯</button>
                    </div> 
                    : ''
                }
                <div className="photo-gallery">
                    <div className="photo-container-header">
                        {`${Object.keys(photos).length} Photos`}
                    </div>
                    <hr className="photo-container-divider"></hr>
                    <div className="photo-container-2">
                        <div><img className="restaurant-page-image" src={urls[0]} onClick={() => showImage(popupUrls[0])}></img></div>
                        <div><img className="restaurant-page-image" src={urls[1]} onClick={() => showImage(popupUrls[1])}></img></div>
                    </div>
                </div>
                </>
            )
        } else if (photoLength === 3){
            return (
                <>
                {photoSlider ? 
                    <div className="gallery-img-container" onClick={hideImage}>
                        <button onClick={showPrevImage} className="popup-image-nav-button-left">❮</button>
                            <img class="gallery-img" src={image}></img>
                        <button onClick={showNextImage} className="popup-image-nav-button-right">❯</button>
                    </div> 
                    : ''
                }
                <div className="photo-gallery">
                    <div className="photo-container-header">
                        {`${Object.keys(photos).length} Photos`}
                    </div>
                    <hr className="photo-container-divider"></hr>
                    <div className="photo-container-3">
                        <div className="photo-container-3-img-1"><img className="restaurant-page-image" src={urls[0]} onClick={() => showImage(popupUrls[0])}></img></div>
                        <div className="photo-container-3-img-2"><img className="restaurant-page-image" src={urls[1]} onClick={() => showImage(popupUrls[1])}></img></div>
                        <div className="photo-container-3-img-3"><img className="restaurant-page-image" src={urls[2]} onClick={() => showImage(popupUrls[2])}></img></div>
                    </div>
                </div>
                </>
            )
        } 

        else if (photoLength === 4){
            return (
                <>
                {photoSlider ? 
                    <div className="gallery-img-container" onClick={hideImage}>
                        <button onClick={showPrevImage} className="popup-image-nav-button-left">❮</button>
                            <img class="gallery-img" src={image}></img>
                        <button onClick={showNextImage} className="popup-image-nav-button-right">❯</button>
                    </div> 
                    : ''
                }
                <div className="photo-gallery">
                    <div className="photo-container-header">
                        {`${Object.keys(photos).length} Photos`}
                    </div>
                    <hr className="photo-container-divider"></hr>
                    <div className="photo-container-4">
                        <div className="photo-container-4-img-1"><img className="restaurant-page-image" src={urls[0]} onClick={() => showImage(popupUrls[0])}></img></div>
                        <div className="photo-container-4-img-2"><img className="restaurant-page-image" src={urls[1]} onClick={() => showImage(popupUrls[1])}></img></div>
                        <div className="photo-container-4-img-3"><img className="restaurant-page-image" src={urls[2]} onClick={() => showImage(popupUrls[2])}></img></div>
                        <div className="photo-container-4-img-4"><img className="restaurant-page-image" src={urls[3]} onClick={() => showImage(popupUrls[3])}></img></div>
                    </div>
                </div>
                </>
            )
        } 
        
        else if (photoLength === 5){
            return (
                <>
                {photoSlider ? 
                    <div className="gallery-img-container" onClick={hideImage}>
                        <button onClick={showPrevImage} className="popup-image-nav-button-left">❮</button>
                            <img class="gallery-img" src={image}></img>
                        <button onClick={showNextImage} className="popup-image-nav-button-right">❯</button>
                    </div> 
                    : ''
                }
                <div className="photo-gallery">
                    <div className="photo-container-header">
                        {`${Object.keys(photos).length} Photos`}
                    </div>
                    <hr className="photo-container-divider"></hr>
                    <div className="photo-container-5">
                        <div className="photo-container-5-img-1"><img className="restaurant-page-image" src={urls[0]} onClick={() => showImage(popupUrls[0])}></img></div>
                        <div className="photo-container-5-img-2"><img className="restaurant-page-image" src={urls[1]} onClick={() => showImage(popupUrls[1])}></img></div>
                        <div className="photo-container-5-img-3"><img className="restaurant-page-image" src={urls[2]} onClick={() => showImage(popupUrls[2])}></img></div>
                        <div className="photo-container-5-img-4"><img className="restaurant-page-image" src={urls[3]} onClick={() => showImage(popupUrls[3])}></img></div>
                        <div className="photo-container-5-img-5"><img className="restaurant-page-image" src={urls[4]} onClick={() => showImage(popupUrls[4])}></img></div>

                    </div>
                </div>
                </>
            )
        } 
        
        else if (photoLength === 6){
            return (
                <>
                {photoSlider ? 
                    <div className="gallery-img-container" onClick={hideImage}>
                        <button onClick={showPrevImage} className="popup-image-nav-button-left">❮</button>
                            <img class="gallery-img" src={image}></img>
                        <button onClick={showNextImage} className="popup-image-nav-button-right">❯</button>
                    </div> 
                    : ''
                }
                <div className="photo-gallery">
                    <div className="photo-container-header">
                        {`${Object.keys(photos).length} Photos`}
                    </div>
                    <hr className="photo-container-divider"></hr>
                    <div className="photo-container-6">
                        <div className="photo-container-6-img-1"><img className="restaurant-page-image" src={urls[0]} onClick={() => showImage(popupUrls[0])}></img></div>
                        <div className="photo-container-6-img-2"><img className="restaurant-page-image" src={urls[1]} onClick={() => showImage(popupUrls[1])}></img></div>
                        <div className="photo-container-6-img-3"><img className="restaurant-page-image" src={urls[2]} onClick={() => showImage(popupUrls[2])}></img></div>
                        <div className="photo-container-6-img-4"><img className="restaurant-page-image" src={urls[3]} onClick={() => showImage(popupUrls[3])}></img></div>
                        <div className="photo-container-6-img-5"><img className="restaurant-page-image" src={urls[4]} onClick={() => showImage(popupUrls[4])}></img></div>
                        <div className="photo-container-6-img-6"><img className="restaurant-page-image" src={urls[5]} onClick={() => showImage(popupUrls[5])}></img></div>
                    </div>
                </div>
                </>
            )
        } 
        
        else if (photoLength === 7){
            return (
                <>
                {photoSlider ? 
                    <div className="gallery-img-container" onClick={hideImage}>
                        <button onClick={showPrevImage} className="popup-image-nav-button-left">❮</button>
                            <img class="gallery-img" src={image}></img>
                        <button onClick={showNextImage} className="popup-image-nav-button-right">❯</button>
                    </div> 
                    : ''
                }
                <div className="photo-gallery">
                    <div className="photo-container-header">
                        {`${Object.keys(photos).length} Photos`}
                    </div>
                    <hr className="photo-container-divider"></hr>
                    <div className="photo-container-7">
                        <div className="photo-container-7-img-1"><img className="restaurant-page-image" src={urls[0]} onClick={() => showImage(popupUrls[0])}></img></div>
                        <div className="photo-container-7-img-2"><img className="restaurant-page-image" src={urls[1]} onClick={() => showImage(popupUrls[1])}></img></div>
                        <div className="photo-container-7-img-3"><img className="restaurant-page-image" src={urls[2]} onClick={() => showImage(popupUrls[2])}></img></div>
                        <div className="photo-container-7-img-4"><img className="restaurant-page-image" src={urls[3]} onClick={() => showImage(popupUrls[3])}></img></div>
                        <div className="photo-container-7-img-5"><img className="restaurant-page-image" src={urls[4]} onClick={() => showImage(popupUrls[4])}></img></div>
                        <div className="photo-container-7-img-6"><img className="restaurant-page-image" src={urls[5]} onClick={() => showImage(popupUrls[5])}></img></div>
                        <div className="photo-container-7-img-7"><img className="restaurant-page-image" src={urls[6]} onClick={() => showImage(popupUrls[6])}></img></div>

                    </div>
                </div>
                </>
            )
        } 
        else if (photoLength === 8){
            return (
                <>
                {photoSlider ? 
                    <div className="gallery-img-container" onClick={hideImage}>
                        <button onClick={showPrevImage} className="popup-image-nav-button-left">❮</button>
                            <img class="gallery-img" src={image}></img>
                        <button onClick={showNextImage} className="popup-image-nav-button-right">❯</button>
                    </div> 
                    : ''
                }
                <div className="photo-gallery">
                    <div className="photo-container-header">
                        {`${Object.keys(photos).length} Photos`}
                    </div>
                    <hr className="photo-container-divider"></hr>
                    <div className="photo-container-8">
                        <div className="photo-container-8-img-1"><img className="restaurant-page-image" src={urls[0]} onClick={() => showImage(popupUrls[0])}></img></div>
                        <div className="photo-container-8-img-2"><img className="restaurant-page-image" src={urls[1]} onClick={() => showImage(popupUrls[1])}></img></div>
                        <div className="photo-container-8-img-3"><img className="restaurant-page-image" src={urls[2]} onClick={() => showImage(popupUrls[2])}></img></div>
                        <div className="photo-container-8-img-4"><img className="restaurant-page-image" src={urls[3]} onClick={() => showImage(popupUrls[3])}></img></div>
                        <div className="photo-container-8-img-5"><img className="restaurant-page-image" src={urls[4]} onClick={() => showImage(popupUrls[4])}></img></div>
                        <div className="photo-container-8-img-6"><img className="restaurant-page-image" src={urls[5]} onClick={() => showImage(popupUrls[5])}></img></div>
                        <div className="photo-container-8-img-7"><img className="restaurant-page-image" src={urls[6]} onClick={() => showImage(popupUrls[6])}></img></div>
                        <div className="photo-container-8-img-8"><img className="restaurant-page-image" src={urls[7]} onClick={() => showImage(popupUrls[7])}></img></div>

                    </div>
                </div>
                </>
            )
        } 
        else if (photoLength > 8){
            let extraPhotos = photoLength - 8;
            return (
                <>
                {photoSlider ? 
                    <div className="gallery-img-container" onClick={hideImage}>
                        <button onClick={showPrevImage} className="popup-image-nav-button-left">❮</button>
                            <img class="gallery-img" src={image}></img>
                        <button onClick={showNextImage} className="popup-image-nav-button-right">❯</button>
                    </div> 
                    : ''
                }
                <div className="photo-gallery">
                    <div className="photo-container-header">
                        {`${Object.keys(photos).length} Photos`}
                    </div>
                    <hr className="photo-container-divider"></hr>
                    <div className="photo-container-8">
                        <div className="photo-container-8-img-1"><img className="restaurant-page-image" src={urls[0]} onClick={() => showImage(popupUrls[0])}></img></div>
                        <div className="photo-container-8-img-2"><img className="restaurant-page-image" src={urls[1]} onClick={() => showImage(popupUrls[1])}></img></div>
                        <div className="photo-container-8-img-3"><img className="restaurant-page-image" src={urls[2]} onClick={() => showImage(popupUrls[2])}></img></div>
                        <div className="photo-container-8-img-4"><img className="restaurant-page-image" src={urls[3]} onClick={() => showImage(popupUrls[3])}></img></div>
                        <div className="photo-container-8-img-5"><img className="restaurant-page-image" src={urls[4]} onClick={() => showImage(popupUrls[4])}></img></div>
                        <div className="photo-container-8-img-6"><img className="restaurant-page-image" src={urls[5]} onClick={() => showImage(popupUrls[5])}></img></div>
                        <div className="photo-container-8-img-7"><img className="restaurant-page-image" src={urls[6]} onClick={() => showImage(popupUrls[6])}></img></div>
                        <div className="photo-container-8-img-8 image-with-text">
                            <img className="restaurant-page-image image-with-bg" src={urls[7]} onClick={() => showImage(popupUrls[7])}></img>
                            <div class="centered">Plus {extraPhotos} more</div>
                        </div>

                    </div>
                </div>
                </>
            )
        } 
        
        else {
            return (
                <div className="photo-gallery">
                    <div className="photo-container-header">
                        {`${Object.keys(photos).length} Photos`}
                    </div>
                    <hr className="photo-container-divider"></hr>
                    <div className="photo-container-null"></div>
                </div>
            )
        }
        
    } else {
        return (
            <div className="photo-gallery">
                <div className="photo-container-header">
                    {`${Object.keys(photos).length} Photos`}
                </div>
                <hr className="photo-container-divider"></hr>
                <div className="photo-container-null"></div>
            </div>
        )
    }
}

export default PhotoGallery;