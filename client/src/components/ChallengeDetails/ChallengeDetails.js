import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './ChallengeDetails.css';
import Fade from 'react-reveal/Fade';
import { showErrMsg, showSuccessMsg } from '../utils/notification/Notification';
import Loader from "react-loader-spinner";

const initialState = {
    err: '',
    success: ''
}


function ChallengeDetails() {
    const [challengeData, setChallengeData] = useState([]);
    const [ execData, setExecData] = useState(initialState)
    const [loading, setLoading] = useState(true)
    const {err, success} = execData;

    const getChallengeData = async () => {
        try {
            const challengesData = await axios.get('/user/challenge_data')
            setChallengeData(challengesData.data);
            setLoading(false)
        } catch(err) {
            err.response.data.msg && 
            setExecData({...execData, err: 'An error occures when we were fetching the data. Sorry for the incovenience caused.'})
        }
        
    }
    useEffect(() => {
        getChallengeData();
    }, [])

    return (
        <React.Fragment>
         <div id="section_main" className="home_container">
                <h2 className="user_heading header_default">Challenges</h2>
                <Fade left>
                {!execData.err ? 
                <div className="challenges_details_container">
                    {!loading ? 
                    <>{challengeData.length > 0 ? 
                    <div className="challenges_list">
                        {challengeData.map(challenge => (
                                <div className="challenges_list_item">
                                    <div className="challenges_list_item_left"><span># </span>{challenge.challengeCode}</div>
                                    <div className="challenges_list_item_right">
                                        <div className="challenges_list_item_right_name">{challenge.challengeName}</div>
                                        <div className="challenges_list_item_right_description">{challenge.challengeDescription}</div>
                                    </div>
                                </div>
                        ))}
                    </div> : 'No challenges to show'}</> : <Loader
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

export default ChallengeDetails;