import React from 'react'
import {Link} from 'react-router-dom'
import "./Home.css"
// import access_from_anywhere from '../images/illustrations/access_from_anywhere.png'
import complete_pomodoro_sessions from '../images/illustrations/complete_pomodoro_sessions.png'
import complete_your_tasks_fast from '../images/illustrations/complete_your_tasks_fast.png'
// import get_on_top_of_the_leaderboard from '../images/illustrations/get_on_top_of_the_leaderboard.png'
import learn_everyday from '../images/illustrations/learn_everyday.png'
import see_your_stats_realtime from '../images/illustrations/see_your_stats_realtime.png'
// import take_small_breaks from '../images/illustrations/take_small_breaks.png'
import work_everyday from '../images/illustrations/work_everyday.png'
import christmas_event_poster from '../images/poster_christmas_low.png'
import black_friday_poster from '../images/black_friday_event.png'
import new_year_event from '../images/new_year_event.png'
import Fade from 'react-reveal/Fade';

import { Carousel } from 'react-carousel-minimal';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
    const data = [
        {
            image: black_friday_poster,
            caption: "Black Friday Event"
        },
        {
          image: christmas_event_poster,
          caption: "Christmas Event"
        },
        
        {
          image: new_year_event,
          caption: "New Year 2022 Event"
        }
    ];

    const year = new Date().getFullYear();
    return (
        <React.Fragment>
        <Fade bottom>
        <div>
            <div className="home_container home_section home_container_flex">
                <div className="home_container_left">
                    <div className="home_container_left_vertical">
                        <h2 className="home_heading">Start being focused and productive</h2>
                        <h4 className="home_subheading">Join our app to get productive with pomodoro study sessions and task management.</h4>
                        <div className="home_button_container">
                            <div className="home_button_features_container">
                                <Link to="/pomodoro"><a className="features_link">Pomodoro</a></Link>
                                <Link to="/tasks"><a className="features_link">Todo</a></Link>
                                <Link to="/studywith"><a className="features_link">Study With</a></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home_container_right">
                    <img alt="project_focus_design_image" src="https://res.cloudinary.com/mainstreammedia/image/upload/v1638435380/misc/body_image_got58x.png" />
                </div>
            </div>   
        </div>

        <div className="home_section" id="full_size">
            <h1 className="user_heading">
                FEATURES
            </h1>
            <div className="home_section_container">
                <div className="home_section_card">
                    <img alt="timer" src={complete_pomodoro_sessions}/>
                    <div className="home_section_card_content">
                        <div className="home_section_card_content_text">
                            Stay productive by completing pomodoro sessions and task management.
                            This App provides you with features like pomodoro sessions, task management and advanced statistics.
                        </div>
                    </div>
                </div>
                <div className="home_section_card">
                    <img alt="timer" src={complete_your_tasks_fast}/>
                    <div className="home_section_card_content">
                        <div className="home_section_card_content_text">
                            Complete your tasks fast and be ahead.
                            You will observe drastic change in your study pattern and academics by completing pomodoro sessions.
                        </div>
                    </div>
                </div>
                <div className="home_section_card">
                    <img alt="timer" src={see_your_stats_realtime}/>
                    <div className="home_section_card_content">
                        <div className="home_section_card_content_text">
                            Observe your pomodoro statistics real time. 
                            Look at all the days you have worked and see all the pomodoro sessions you have completed on that day.
                            Also you can look at monthly statistics.
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="home_section" id="full_size">
            <h1 className="user_heading">
                WHY JOIN US?
            </h1>
            <div className="home_section_rect_container ">
                <div className="home_section_rect">
                    <div className="home_section_rect_left">
                        <img alt="project_focus_learn_everyday" src={learn_everyday} />
                    </div>
                    <div className="home_section_rect_right">
                        <h3 className="home_section_rect_right_heading">Manage distractions and control your time</h3>
                        <p className="home_section_rect_right_subheading">The Pomodoro Technique empowers you to take control of your own time. If a co-worker approaches you during the middle of a pomodoro, use the “inform → negotiate → schedule → call back” approach to postpone the interruption until you are ready. Kindly inform them that you are in the middle of something, but negotiate and schedule a time when you will be available to help. Then, when you are ready, invite them to come back and talk to you.</p>
                    </div>
                </div>
            </div>
            <div className="home_section_rect_container_odd">
                <div className="home_section_rect_odd">
                    <div className="home_section_rect_right">
                        <h3 className="home_section_rect_right_heading">Increase accountability</h3>
                        <p className="home_section_rect_right_subheading">At the end of each pomodoro, take a minute to write down everything you have accomplished. Keeping a record of your work will allow you to give an impressive and transparent productivity report to your managers.</p>
                    </div>
                    <div className="home_section_rect_left">
                        <img alt="project_focus_work_everyday" src={work_everyday} />
                    </div>
                </div>
            </div>
        </div>

        <div className="home_section" id="full_size">
            <h1 className="user_heading">
                UPCOMING EVENTS
            </h1>
            <div className="events_image_container">
            <div className="events_image_container_slider">
            <Carousel
                data={data}
                time={2000}
                width="1000px"
                height="450px"
                // captionStyle={captionStyle}
                radius="10px"
                slideNumber={true}
                // slideNumberStyle={slideNumberStyle}
                captionPosition="bottom"
                automatic={false}
                dots={true}
                pauseIconColor="white"
                pauseIconSize="40px"
                slideBackgroundColor="darkgrey"
                slideImageFit="cover"
                thumbnails={false}
                thumbnailWidth="100px"
                style={{
                textAlign: "center",
                maxWidth: "850px",
                maxHeight: "500px",
                margin: "40px auto",
                }}
            />
            </div>
            </div>
        </div>
        

        <div className="footer_container">
            <div className="footer">
                <div className="footer_container_image">
                    <img alt="project_focus_main_text_logo" src="https://res.cloudinary.com/mainstreammedia/image/upload/v1638449967/misc/project_focus_main_sp0sqx.png" />
                </div>
                <div className="footer_container_top">
                    <h2 className="footer_container_heading">Help us make ourselves better</h2>
                </div>
                
                <div className="footer_container_middle">
                    <div className="footer_container_card">
                        <h5 className="footer_container_card_heading">Help us by providing your input in improving the website</h5>
                        <div className="footer_container_card_sub">
                            Let out your ideas to us and help make this website amazing just as you are.
                        </div>
                    </div>

                    <div className="footer_container_card">
                        <h5 className="footer_container_card_heading">Let us know if you face any issues on the website</h5>
                        <div className="footer_container_card_sub">
                            <div className="footer_container_card_sub_text">You can write your issue by clicking the button given below</div>
                            <div className="footer_container_card_sub_btns">
                                <Link to="/make_issue"><a className="features_link">Make Issue</a></Link>
                            </div>
                        </div>
                    </div>

                    <div className="footer_container_card">
                        <h5 className="footer_container_card_heading">Tech Stack</h5>
                        <div className="footer_container_card_sub_flex">
                            <i className="fab fa-react"></i>
                            <p className="logo_text">Redux</p>
                            <i className="fab fa-node-js"></i>
                            <i className="fab fa-html5"></i>
                            <i className="fab fa-css3-alt"></i>
                        </div>
                        <div className="footer_container_card_sub_flex">
                            <p className="logo_text">mongoose</p>
                            <p className="logo_text">express.js</p>
                            <i className="fab fa-bootstrap"></i>
                            <p className="logo_text">axios</p>
                            <i className="fab fa-google logo_text_icon"> api</i>
                        
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="footer_container_bottom">
                    <h2 className="footer_copy_right_center">Copyright <i className="far fa-copyright"></i> {year} <span style={{fontWeight: '500', color: 'red'}}>Project Focus</span></h2>
            </div>
        </div>
        </Fade>
        </React.Fragment>
    )
}

export default Home
