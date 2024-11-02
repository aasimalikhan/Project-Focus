import React from 'react'
import './GetStarted.css'
import Fade from 'react-reveal/Fade';


function GetStarted() {
    return (
        <Fade bottom>
        <div id="section_main" className="">
            <h2 className="user_heading header_default">GET STARTED</h2>
            <div className="data_container">
                <h2 className="data_container_heading">What is Project Focus?</h2>
                <p className='data_container_subheading'>Project Focus is a Website Project developed to help people focus on what they do, Increase their productivity by Pomodoro Sessions and Provide them with their productivity statistics. </p>
            </div>

            <div className="data_container">
                <h2 className="data_container_heading">Why use Project Focus?</h2>
                <p className='data_container_subheading'>First of all it's free and provides advanced data statistics with a good User Interface where user crave to study more and more. </p>
            </div>

            <div className="data_container">
                <h2 className="data_container_heading">How to use?</h2>
                <ul>
                    <li>You can register yourself into the Application by providing your credentials, registration requires email authentication that you have filled. The email verification link will be valid for 5 minutes, else you have to resend the link</li>
                    <li>After registration, you can log in with your username and password.</li>
                    <li>You will have access to your profile page, where you can change your profile picture, password and others</li>
                    <li>You can have a look at the study with me section where live youtube videos are displayed where people are studying live.</li>
                    <li>Coming to the pomodoro section, you can complete the pomodoro sessions and see your statistics</li>
                    <li>You can see where you stand on the leaderboard</li>
                    <li>You can use the Task List Section, to manage and schedule your tasks</li>
                    <li>You can have a look at the challenges and Latest Announcments posted on the Application</li>
                </ul>
            </div>
        </div>
        </Fade>
        
    )
}

export default GetStarted
