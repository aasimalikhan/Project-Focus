import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification' 
import {isEmail, isEmpty, isLength, isMatch} from '../../utils/validation/Validation'
import Bounce from 'react-reveal/Bounce';

const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register() {
    const [user, setUser] = useState(initialState)

    const {name, email, password, cf_password, err, success} = user;

    const handleChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
            if(isEmpty(name) || isEmpty(password))
                return setUser({...user, err: "Please fill all the fields", success: ''})

            if(!isEmail(email))
                return setUser({...user, err: "Invalid email", success: ''})

            if(isLength(password))
                return setUser({...user, err: "Please must be atleast 6 characters long", success: ''})

            if(!isMatch(password, cf_password))
                return setUser({...user, err: "Passwords don't match", success: ''})

        try {
            const res = await axios.post('/user/register', {name, email, password}) //controller adds this data to database
            console.log(res);
            setUser({...user, err: '', success: res.data.msg})

        } catch (err) {
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <Bounce bottom>
        <div className="login_container">
        <div className="login_page">
            <h2 className="margin-btm-med">Register</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div className="margin-btm-low">
                    <label className="auth_label" htmlFor="name">Name</label>
                    <input className="auth_input" type="text" placeholder="Enter your name" id="name" value={name} name="name" onChange={handleChangeInput}/>
                </div>

                <div className="margin-btm-low">
                    <label className="auth_label" htmlFor="email">Email Address</label>
                    <input className="auth_input" type="email" placeholder="Enter email address" id="email" value={email} name="email" onChange={handleChangeInput}/>
                </div>

                <div className="margin-btm-low">
                    <label className="auth_label" htmlFor="password">Password</label>
                    <input className="auth_input" type="password" placeholder="Enter password" id="password" value={password} name="password" onChange={handleChangeInput}/>
                </div>

                <div className="margin-btm-huge">
                    <label className="auth_label" htmlFor="cf_password">Confirm Password</label>
                    <input className="auth_input" type="password" placeholder="Confirm password" id="cf_password" value={cf_password} name="cf_password" onChange={handleChangeInput}/>
                </div>

                <div className="row margin-btm-med row">
                    <button className="auth_button" type="submit">Register</button>
                </div>
            </form>

            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
        </div>
        </Bounce>
    )
}

export default Register