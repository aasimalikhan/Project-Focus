import React from 'react'
import './Resources.css'
//Loading Images
import udemy_logo from '../images/udemy_logo.png'
import skillshare_logo from '../images/skillshare_logo.png'
import coursera_logo from '../images/coursera_logo.png'

import cant_hurt_me from '../images/cant_hurt_me.jpg'
import atomic_habits from '../images/atomic_habits.jpg'
import deep_work from '../images/deep_work.jpg'

function Resources() {
    return (
        <div id="section_main" className="home_container">
            <h2 className="user_heading header_default">Resources</h2>
            <div className="good_course_website_container">
                <h2 className="user_subheading_text">Good website for courses</h2>
                <div className="good_course_website_flex">
                    <div className="good_course_website_card">
                        <img src={udemy_logo} />
                    </div>

                    <div className="good_course_website_card">
                        <img src={skillshare_logo} />
                    </div>

                    <div className="good_course_website_card">
                        <img src={coursera_logo} />
                    </div>
                </div>
            </div>

            <div className="good_course_website_container">
                <h2 className="user_subheading_text">Good Books</h2>
                <div className="good_course_website_flex">
                    <div className="good_course_website_card">
                        <img src={atomic_habits} />
                    </div>

                    <div className="good_course_website_card">
                        <img src={cant_hurt_me} />
                    </div>

                    <div className="good_course_website_card">
                        <img src={deep_work} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resources
