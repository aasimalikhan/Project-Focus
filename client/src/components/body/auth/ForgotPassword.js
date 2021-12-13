import React, {useState} from 'react'
import axios from 'axios'
import {isEmail} from '../../utils/validation/Validation'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import Fade from 'react-reveal/Fade';


const initialState = {
    email: '',
    err: '',
    success: ''
}

function ForgotPassword() {
    const [data, setData] = useState(initialState)

    const {email, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]: value, err: '', success: ''})
    }

    const forgotPassword = async () => { //when button clicked
        //Performs validation
        //Takes input of email and performs validation
        if(!isEmail(email))
            return setData({...data, err: 'Invalid email', success: ''})
        try {
            //posts the email to the route, where the backend sends a mail to specified email
            const res = await axios.post('/user/forgot', {email}) //sends email
            
            return setData({...data, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <div className="login_container">
            <div className="login_page">
                <h2 className="margin-btm-med">Forgot your Password?</h2>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <div>
                    <div className="margin-btm-huge">
                        <label className="auth_label" htmlFor="email">Enter your email address</label>
                        <input type="email" name="email" id="email" className="auth_input" placeholder="Enter email address" value={email} onChange={handleChangeInput}/>
                    </div>
                    <div className="row margin-btm-med">
                        <button className="auth_button" onClick={forgotPassword}>Verify your email</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
