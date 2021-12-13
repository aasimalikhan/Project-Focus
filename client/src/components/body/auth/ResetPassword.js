import React, {useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isLength, isMatch} from '../../utils/validation/Validation'

const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function ResetPassword() {
    const [data, setData] = useState(initialState)
    const {token} = useParams()

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]: value, err: '', success: ''})
    }

    const handleResetPass = async () => {
        if(isLength(password))
            return setData({...data, err: "Please must be atleast 6 characters long", success: ''})
        if(!isMatch(password, cf_password))
            return setData({...data, err: "Passwords do not match", success: ''})
        try {
            const res = await axios.post('/user/reset', {password}, {
                headers: {Authorization: token}
            })

            return setData({...data, err: "", success: res.data.msg})
        } catch(err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
    }
    const {password, cf_password, err, success} = data
    return (
        <div className="login_container">
            <div className="login_page">
                <h2 className="margin-btm-med">Reset Password</h2>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <div>
                    <div className="margin-btm-low">
                        <label className="auth_label" htmlFor="password">Enter Password</label>
                        <input type="password" name="password" id="password" className="auth_input" placeholder="Enter password" value={password} onChange={handleChangeInput}/>
                    </div>
                    <div className="margin-btm-huge">
                        <label className="auth_label" htmlFor="cf_password">Confirm Password</label>
                        <input className="auth_input" type="password" placeholder="Confirm password" id="cf_password" value={cf_password} name="cf_password" onChange={handleChangeInput}/>
                    </div>
                    <div className="row margin-btm-med">
                        <button className="auth_button" onClick={handleResetPass}>Change Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
