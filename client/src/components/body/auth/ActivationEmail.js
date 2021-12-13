import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'

function ActivationEmail() {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        //activation token is sent to the route
        if(activation_token) {
            const activationEmail = async () => {
                try {
                    //if the account is valid, the user is registered (added into database)
                    const res = await axios.post('/user/activation', {activation_token})
                    setSuccess(res.data.msg)
                } catch(err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    }, [activation_token])

    return (
        <div className="active_page">
            {err && showErrMsg(err)}            
            {success && showSuccessMsg(success)}
        </div>
    )
}

export default ActivationEmail
