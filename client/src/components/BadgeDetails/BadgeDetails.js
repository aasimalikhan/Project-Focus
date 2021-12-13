import React from 'react'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './BadgeDetails.css';

//Static Page
function BadgeDetails() {
    const [medalData, setMedalData] = useState([]);

    // useEffect(() => {
        // Getting medal details
    const getMedalData = async () => {
        const medalsData = await axios.get('/user/medals_data')
        setMedalData(medalsData.data);
    }
    useEffect(() => {
        getMedalData();
    }, [])


    // }, [medalData])


    return (
        <React.Fragment>
         <div id="section_main" className="home_container">
                <h2 className="user_heading header_default">Badges</h2>
                <div className="badges_details_container">
                    {medalData.map(medal => (
                        <div className="badges_details_card">
                        <img className="badges_details_image" src={medal.icon} alt="bronze_badge"/>
                        <p className="badges_details_heading">{medal.medalname}</p>
                        <ul className="badges_details_list">
                            <li className="badges_details_list_item">{medal.medaldetails}</li>
                        </ul>
                        </div>
                    ))}
                </div>
        </div>   
        </React.Fragment>
    )
}

export default BadgeDetails;