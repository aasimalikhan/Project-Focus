import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './LeaderBoard.css';
import Fade from 'react-reveal/Fade';
import { showErrMsg, showSuccessMsg } from '../utils/notification/Notification'
import Loader from "react-loader-spinner";


const initialState = {
    err: '',
    success: ''
}

function LeaderBoard() {
    const [leaderBoardData, setLeaderBoardData] = useState([])
    const [ execData, setExecData] = useState(initialState);
    const {err, success} = execData;
    const [loading, setLoading] = useState(true);

    const getLeaderBoardData = async () => {
        try {
            const leaderBoardResponse = await axios.get('/user/get_leaderboard_data')
            setLeaderBoardData(leaderBoardResponse.data);
            setLoading(false)
        } catch (err) {
            setExecData({...execData, err: 'An error occured when we were fetching the data. Please bear with us.', success: ''})
        }
    }
    useEffect(() => {
        getLeaderBoardData();
    }, [])
        
    return (
        <React.Fragment>
         <div id="section_main" className="home_container">
                <h2 className="user_heading header_default">LeaderBoard</h2>
                <Fade left>
                {!execData.err ? 
                <div className="leaderboard_details_container">
                {!loading ?
                <>{leaderBoardData.length > 0 ?
                <div className="leaderboard_list">
                    {leaderBoardData.map((person, index) => (
                            <div className="leaderboard_list_item">
                                <div className="leaderboard_list_item_left">{index+1}</div>
                                <div className="leaderboard_list_item_right">
                                    <div className="leaderboard_list_item_right_left">
                                        <img src={person.data.avatar} className="leaderboard_list_image"/>
                                    </div>
                                    <div className="leaderboard_list_item_right_right">
                                        <div className="leaderboard_list_item_right_name">{person.data.name}   <span>@{person._id.email}</span></div>
                                        <div className="leaderboard_list_item_right_description">{person.total} {person.total == 1 ? 'min' : 'mins'}</div>
                                    </div>
                                </div>
                            </div>
                     ))}
                </div> : 'No details available'}</> : <Loader
                    type="Watch"
                    color="#FF0000"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                /> }
        
                </div> : <>{err && showErrMsg(err)}</>}
                </Fade>
        </div>   
        </React.Fragment>
    )

}

export default LeaderBoard;