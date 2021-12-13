import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty} from '../../utils/validation/Validation'


const initialState = {
    announcementtype: '',
    announcementname: '',
    announcementdescription: '',
    err: '',
    success: ''
}


//Static Page
function MakeAnnouncement() {
    const auth = useSelector(state => state.auth)
    const [data, setData] = useState(initialState)
    const token = useSelector(state => state.token)


    const {user, isLogged} = auth;
    
    const email = user.email;
    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]: value, err: '', success: ''})
    }



    const handleAnnouncementSubmit = async () => {
        if(isEmpty(announcementdescription) || isEmpty(announcementtype) || isEmpty(announcementname))
        {
            return setData({...data, err: "Please fill in all fields", success: ''})
        }
        try {
            const date = new Date().toISOString()
            const res = await axios.post('/user/add_announcement', {announcementtype, email, announcementname, announcementdescription, date}, {headers: {Authorization: token}})

            return setData({...data, err: "", success: res.data.msg})
        } catch(err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    // const {anType, anName, anDesc, password} = data;



    const {announcementtype, announcementname, announcementdescription, err, success} = data
    return (
        <div className="login_container">
            <div className="login_page">
                <h2 className="margin-btm-med">Make Announcement</h2>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <div>
                    <div className="margin-btm-low">
                        <label className="auth_label" htmlFor="announcementtype">Announcement Type</label>
                        <input type="text" name="announcementtype" id="announcementtype" className="auth_input" value={announcementtype} placeholder="Enter type" onChange={handleChangeInput}/>
                    </div>
                    <div className="margin-btm-low">
                        <label className="auth_label" htmlFor="announcementname">Announcement Name</label>
                        <input type="text" name="announcementname" id="announcementname" className="auth_input" placeholder="Enter name" value={announcementname} onChange={handleChangeInput}/>
                    </div>
                    <div className="margin-btm-huge">
                        <label className="auth_label" htmlFor="announcementdescription">Announcement Description</label>
                        <input type="text" name="announcementdescription" id="announcementdescription" className="auth_input" placeholder="Enter description" value={announcementdescription} onChange={handleChangeInput}/>
                    </div>
                    
                    <div className="row margin-btm-med">
                        <button className="auth_button" onClick={handleAnnouncementSubmit}>Make Announcement</button>
                    </div>
                </div>
            </div>
        </div>
    )
  
}

export default MakeAnnouncement;