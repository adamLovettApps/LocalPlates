import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addRestaurantPhoto, getRestaurantPhotos } from "../../../../store/photo"
import "./AddPhotoForm.css"


const AddPhotoForm = () => {
    const photos = useSelector(state => state.photos.photos)
    const [imageLoading, setImageLoading] = useState(false);
    const [image, setImage] = useState(null);
    const { id } = useParams();
    const dispatch = useDispatch();

    const addPhoto = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image); 


        setImageLoading(true);

        const res = await fetch('/api/images', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            let photo = await res.json();
            dispatch(addRestaurantPhoto(id, photo))
            dispatch(getRestaurantPhotos(id));
            setImageLoading(false);

        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        document.getElementById('file-label').innerText = "File Chosen"
        setImage(file);
    }

    return (
        <>
            <div className='add-photo-form'>
                <form onSubmit={addPhoto} >
                    <div className="file">
                        <label for="file-input" id="file-label">Choose a Photo</label>
                        <input 
                            type="file" 
                            id="file-input"
                            accept="image/*"
                            onChange={updateImage}
                        ></input>
                    </div>
                    <div className="form-field-button-container"><button type="submit" className="form-field-button">Upload Photo</button></div>
                    {(imageLoading)&& <p>Loading...</p>}
                </form>
            </div>
        </>
    )
}

export default AddPhotoForm;