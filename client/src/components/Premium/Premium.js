import React from 'react'
import './Premium.css'
import premium_photo from '../images/Premium_Project_Focus_small.jpg'
import logo from '../images/logo_pf.png'
import Fade from 'react-reveal/Fade';

function Premium() {
    return (
        <div id="section_main" className="home_container">
                <h2 className="user_heading header_default premium_heading">PREMIUM SUBSCRIPTION</h2>
                <Fade bottom>
                <div className="premium_details_container">
                    <img src={logo} className="premium_project_focus_logo" />
                    <h2 className="premium_details_heading">Get started with <img src="https://res.cloudinary.com/mainstreammedia/image/upload/v1638449967/misc/project_focus_main_sp0sqx.png" className="premium_img_text"/> premium subscription</h2>

                    <div className="premium_details_card_container">
                        <div className="premium_details_card">
                            <div className="premium_details_main_section">
                                <span>Monthly Subscription</span>  <span className="money_detail">2$</span>
                            </div>
                            <div className="premium_details_secondary_section">
                                <h4 className="premium_details_secondary_heading">
                                    Limited Time Offer
                                </h4>
                                <p>Our monthly plan grants access to all premium features, the best plan for short-term subscribers.</p>
                                <button className="merchandise_buy_button">Subscribe</button>
                            </div>
                        </div>

                        <div className="premium_details_card">
                            <div className="premium_details_main_section premium_details_main_section_red">
                                <span>Yearly Subscription</span>  <span className="money_detail">10$</span>
                            </div>
                            <div className="premium_details_secondary_section">
                                <h4 className="premium_details_secondary_heading">
                                    Limited Time Offer
                                </h4>
                                <p>This plan saves you over 60% in comparison to the monthly plan..</p>
                                <button className="merchandise_buy_button">Subscribe</button>
                            </div>
                        </div>

                        <div className="premium_details_card">
                            <div className="premium_details_main_section premium_details_small_text">
                                <span>Student Subscription (Yearly)</span>  <span className="money_detail">8$</span>
                            </div>
                            <div className="premium_details_secondary_section">
                                <h4 className="premium_details_secondary_heading">
                                    Limited Time Offer
                                </h4>
                                <p>Special plan for college student. Avail special benefits by identifying yourself.</p>
                                <button className="merchandise_buy_button">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
                </Fade>

                
        </div>
    )
}

export default Premium
