import React from 'react'
import { useEffect, useState } from 'react'
import youtube from './apis/youtube'
import {Link} from 'react-router-dom'
import VideoList from './VideoList'
import Fade from 'react-reveal/Fade';
import './Studywith.css';
import { showErrMsg, showSuccessMsg } from '../utils/notification/Notification' 

// import "./Studywith.css"

const initialState = {
    err: '',
    success: ''
}

function Studywith() {
    const [ videodata, setVideoData ] = useState([])
    const [ execData, setExecData] = useState(initialState)
    const {err, success} = execData;

    const searchTerm = async (term) => {
        try {
            const response1 = await youtube.get('/search', {
                params: {
                    q: term,
                    eventType: 'live'
                }
            });
            setVideoData({videos: response1.data.items})
        } catch(err) {
            // err.response.data.msg &&
            setExecData({...execData, err: 'An error occured when we were fetching the data. Please bear with us.', success: ''})
        }
    }

    useEffect(() => {
        searchTerm('study with me live')
    }, [])


    return (
        <React.Fragment>
         <div id="section_main" className="">
                <h2 className="user_heading">Study with amazing people</h2>
                <Fade bottom>
                {err && showErrMsg(err)}

                <VideoList err={err} vids={videodata}/>        
                </Fade>
        </div>   
        </React.Fragment>
    )
}

export default Studywith;