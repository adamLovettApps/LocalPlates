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
            document.querySelector('.choose-photo-text-inner').innerText = "Choose a File"
            document.getElementById('file-upload-selector-div').classList.remove("file-upload-selected");
            document.getElementById('file-upload-selector-div').classList.add("file-upload-selector");
        
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        document.querySelector('.choose-photo-text-inner').innerText = "Photo Chosen"
        document.getElementById('file-upload-selector-div').classList.remove("file-upload-selector");
        document.getElementById('file-upload-selector-div').classList.add("file-upload-selected");
        setImage(file);
    }

    return (
        <>
            <div className='add-photo-form-management'>
                <form onSubmit={addPhoto} >
                    <div className="flex-form">
                    <div id="file-upload-selector-div" className="file-upload-selector">
                        <label for="file-input" id="file-label"><div className="choose-photo-text"><div className="choose-photo-text-inner">Choose a Photo</div></div></label>
                        <input 
                            type="file" 
                            id="file-input"
                            accept="image/*"
                            onChange={updateImage}
                        ></input>
                    </div>
                    <div className="form-field-button-image-upload-container"><button type="submit" className="form-field-button-image-upload">Upload Photo</button></div>
                    
                    </div>
                </form>
                <div>{(imageLoading)&& <p>Loading...</p>}</div>
            </div>
        </>
    )
}

export default AddPhotoForm;