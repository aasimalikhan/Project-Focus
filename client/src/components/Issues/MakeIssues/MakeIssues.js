import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty} from '../../utils/validation/Validation'


const initialState = {
    issueName: '',
    issueType: '',
    issueDescription: '',
    err: '',
    success: ''
}


//Static Page
function MakeIssue() {
    const auth = useSelector(state => state.auth)
    const [data, setData] = useState(initialState)



    const {user, isLogged} = auth;
    
    const email = user.email;
    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]: value, err: '', success: ''})
    }



    const handleAnnouncementSubmit = async () => {
        if(isEmpty(issueName) || isEmpty(issueDescription) || isEmpty(issueType))
        {
            return setData({...data, err: "Please fill in all fields", success: ''})
        }
        try {
            const date = new Date().toISOString()
            const res = await axios.post('/user/add_issue', {issueName, email, issueType, issueDescription, date})

            return setData({...data, err: "", success: res.data.msg})
        } catch(err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    // const {anType, anName, anDesc, password} = data;



    const {issueName, issueType, issueDescription, err, success} = data
    return (
        <div className="login_container">
            <div className="login_page">
                <h2 className="margin-btm-med">Post Issue</h2>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <div>
                    <div className="margin-btm-low">
                        <label className="auth_label" htmlFor="issueName">Issue Name</label>
                        <input type="text" name="issueName" id="issueName" className="auth_input" value={issueName} placeholder="Enter type" onChange={handleChangeInput}/>
                    </div>
                    <div className="margin-btm-low">
                        <label className="auth_label" htmlFor="issueType">Issue Type</label>
                        <input type="text" name="issueType" id="issueType" className="auth_input" placeholder="Enter name" value={issueType} onChange={handleChangeInput}/>
                    </div>
                    <div className="margin-btm-huge">
                        <label className="auth_label" htmlFor="issueDescription">Issue Description</label>
                        <input type="text" name="issueDescription" id="issueDescription" className="auth_input" placeholder="Enter description" value={issueDescription} onChange={handleChangeInput}/>
                    </div>
                    
                    <div className="row margin-btm-med">
                        <button className="auth_button" onClick={handleAnnouncementSubmit}>Submit Issue</button>
                    </div>
                </div>
            </div>
        </div>
    )
  
}

export default MakeIssue;