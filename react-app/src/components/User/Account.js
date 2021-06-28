import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { editUser } from "../../store/user"


function Account({ user }) {

    const dispatch = useDispatch();

    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [photo, setPhoto] = useState(user.profile_photo)
    const [password, setPassword] = useState(user.password)
    const [confirm, setConfirm] = useState(user.password)
    const [errors, setErrors] = useState([])


    const updateUsername = (stri) => {
        setUsername(stri)
    }
    const updatePhoto = (stri) => {
        setPhoto(stri)
    }

    const updatePassword = (stri) => {
        setPassword(stri)
    }

    const updateConfirm = (stri) => {
        setConfirm(stri)
    }

    const updateEmail = (stri) => {
        setEmail(stri)
    }

    useEffect(() => {

        setUsername(user.username)
        setEmail(user.email)
        setPhoto(user.profile_photo)

    }, [user])

    const onEditUser = async (e) => {
        e.preventDefault();
        const newUser = { id: user.id, errors: [] }

        if (password === confirm && password.length > 0) {
            newUser.password = password
        }
        else newUser.errors.push("You must provide a Password and matching Confirm Password.")
        if (photo.length) {
            newUser.photo = photo
        }
        if (email.length && email !== user.email) {
            newUser.email = email
        }
        if (username.length && username !== user.username) {
            newUser.username = username
        }
        const res = await dispatch(editUser(newUser))
        if (res.errors.length) {
            let newErrors = [...errors, ...res.errors]
            setErrors(newErrors)
        }
    }


    return (
        <div className="account-info-wrapper">
            <h2>About me: </h2>
            <img href="user.profile_photo" />
            <div className="form-wrapper">
                <form className="edit-user-form" onSubmit={onEditUser} action={`/api/users/${user.id}`} method="PUT">
                    <div>
                        <label htmlFor="username">Username: </label>
                        <input type="text" id="username" name="username" value={username} onChange={(e) => updateUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="email">Email Address: </label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => updateEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="profile_photo">Profile Photo URL: </label>
                        <input type="profile_photo" id="profile_photo" name="profile_photo" value={photo} onChange={(e) => updatePhoto(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Change Password: </label>
                        <input id="password" name="password" type="password" value={password} onChange={(e) => updatePassword(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="confirm">Confirm Password: </label>
                        <input type="password" id="confirm" value={confirm} onChange={(e) => updateConfirm(e.target.value)} />
                    </div>
                    <div className="button"><button>Save Changes</button></div>
                </form>
            </div>
        </div>
    )
}

export default Account;
