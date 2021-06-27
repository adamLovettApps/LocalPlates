import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PhotoGallery from './PhotoGallery';
import AddPhotoForm from './AddPhotoForm';
import "./PhotoManagement.css"



const PhotoManagement = () => {

    return (
        <>
            <div className="photo-management-header"><div className="photo-management-header-title">Manage Photos</div><hr></hr></div>
            <div className="photo-management-header"><div className="photo-adder-header-title">Add Photos</div><hr></hr></div>
            <AddPhotoForm></AddPhotoForm>
            <div className="photo-management-header"><div className="photo-delete-header-title">Delete Photos</div><hr></hr></div>
            <PhotoGallery></PhotoGallery>

            
        </>
    )
}

export default PhotoManagement;