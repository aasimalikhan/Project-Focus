import React from 'react'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Announcement.css';
import Fade from 'react-reveal/Fade';
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'
import Loader from "react-loader-spinner";


const initialState = {
    err: '',
    success: ''
}

//Static Page
function AnnouncementDetails() {
    const [announcementData, setAnnouncementData] = useState([]);
    const [execData, setExecData] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const {err, success} = execData;

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const getAnnouncementData = async () => {
        try {
            const announcement_data = await axios.get('/user/announcement_data')
            setAnnouncementData(announcement_data.data);
            setLoading(false);
        } catch (err) {
            err.response.data.meg && 
            setExecData({...execData, err: 'An error occured when we were fetching the data. Please refresh the page.'})
        }
    }
    useEffect(() => {
        getAnnouncementData();
    }, [])


    return (
        <React.Fragment>
         <div id="section_main" className="home_container">
                <h2 className="user_heading header_default">Announcements</h2>
                <Fade left>
                {!execData.err ? 
                <div className="announcements_details_container">
                {!loading ? 
                <>{announcementData.length > 0 ? 
                <div className="announcements_list">
                    {announcementData.map(announcement=> (
                        
                            <div className="announcements_list_item">
                                <div className="announcements_list_item_left">{months[new Date(announcement.date).getMonth()]} {new Date(announcement.date).getDate()} <i style={{color: "rgb(0, 234, 255)",marginLeft: "3px"}} className="fas fa-envelope-open-text"></i></div>
                                <div className="announcements_list_item_right">
                                    <div className="announcements_list_item_right_name">{announcement.announcementname}</div>
                                    <div className="announcements_list_item_right_description">{announcement.announcementdescription}</div>
                                </div>
                            </div>
                    ))}
                </div> : 'No announcements to show' }</> : <Loader
                    type="Watch"
                    color="#FF0000"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />}
                </div> : <>{err && showErrMsg(err)}</>}
                </Fade>
          </div>   
        </React.Fragment>
    )
}

export default AnnouncementDetails;