import React from 'react'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Issues.css';
import Fade from 'react-reveal/Fade';
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'
import Loader from "react-loader-spinner";

const initialState = {
    err: '',
    success: ''
}

const initState = {
    err: '',
    success: ''
}

function IssueDetails() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const [data, setData] = useState(initialState)
    const [execData, setExecData] = useState(initState)
    const [loading, setLoading] = useState(true);
    const {err, success} = execData;


    const {user, isAdmin} = auth;
    const [issueData, setIssueData] = useState([]);
    const [loadingData, setLoadingData] = useState(true)
    const [callback, setCallback] = useState(false)

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    const getIssueData = async () => {
        try {
            const issue_Data = await axios.get('/user/issue_data', {
                headers: {Authorization: token}
            })
            setIssueData(issue_Data.data);
            setLoadingData(false)
        } catch (err) {
            err.response.data.msg && 
            setExecData({...execData, err: 'An error occured when we were fetching the data. Please bear with us', success: ''})
        }
    }

    useEffect(() => {
        getIssueData();
    }, [isAdmin, callback])

    const handleDelete = async (id) => {
        try {
                if(window.confirm("Are you sure you want to delete this issue?"))
                {
                    setLoading(true)
                    const val = await axios.delete(`/user/delete_issue/${id}`, {
                        headers: {Authorization: token}
                    })

                    // getIssueData();
                    setIssueData({...data})
                    setCallback(callback => !callback)
                }
        } catch (err) {
            setData({...data, err: err.response.data.msg, success: ''})
        }
    }
    
    return (
        <React.Fragment>
         <div id="section_main" className="home_container">
                <h2 className="user_heading header_default">Issues</h2>
                {/* {isAdmin ?  */}
                <Fade left>
                {!execData.err ? 
                <div className="announcements_details_container">
                    {!loadingData ? 
                    <>{issueData.length > 0 ? 
                <div className="announcements_list">
                    {issueData.map(issue=> (
                        
                            <div key={issue._id} className="announcements_list_item">
                                <div className="announcements_list_item_left">{months[new Date(issue.date).getMonth()]} {new Date(issue.date).getDate()} <i style={{color: "rgb(0, 234, 255)",marginLeft: "3px"}} className="fas fa-envelope-open-text"></i></div>
                                <div className="announcements_list_item_right">
                                    <div className="announcements_list_item_right_name">{issue.issueName}</div>
                                    <div className="announcements_list_item_right_description">{issue.issueDescription}</div>
                                </div>
                            </div>
                    ))}
                </div> : 'No issues to show'}</> : <Loader
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

export default IssueDetails;