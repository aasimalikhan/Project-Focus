import React from 'react'
import './Merchandise.css'
import Fade from 'react-reveal/Fade';


function Merchandise() {
    return (
        <div id="section_main" className="home_container">
            <h2 className="user_heading header_default">Merchandise</h2>
            <Fade bottom>
            <div className="merchandise_container">
                {/* <h2 className="user_subheading_text">Good website for courses</h2> */}
                <div className="merchandise_container_flex">
                    <div className="merchandise_card">
                        <div className="merchandise_card_img">
                            <img src="https://res.cloudinary.com/mainstreammedia/image/upload/v1638866190/merchandise/tshirt_design_main_3c_hwiiyq.png" />
                        </div>
                        <div className="merchandise_card_detail">
                            <p className="merchandise_card_heading">Project Focus T-Shirt 1221</p>
                            <p className="merchandise_card_subheading">Printed T-Shirt By Project Focus</p>
                            <p className="merchandise_card_price">$ 40</p>
                            <button className="merchandise_buy_button">Buy Now</button>
                        </div>
                    </div>

                    <div className="merchandise_card">
                        <div className="merchandise_card_img">
                            <img src="https://res.cloudinary.com/mainstreammedia/image/upload/v1638866190/merchandise/tshirt_design_main_1c_xjlqel.png" />
                        </div>
                        <div className="merchandise_card_detail">
                            <p className="merchandise_card_heading">Project Focus T-Shirt 1222</p>
                            <p className="merchandise_card_subheading">Printed T-Shirt By Project Focus</p>
                            <p className="merchandise_card_price">$ 42</p>
                            <button className="merchandise_buy_button">Buy Now</button>
                        </div>
                    </div>

                    <div className="merchandise_card">
                        <div className="merchandise_card_img">
                            <img src="https://res.cloudinary.com/mainstreammedia/image/upload/v1638866190/merchandise/tshirt_design_main_2c_jmzog1.png" />
                        </div>
                        <div className="merchandise_card_detail">
                            <p className="merchandise_card_heading">Project Focus T-Shirt 1223</p>
                            <p className="merchandise_card_subheading">Printed T-Shirt By Project Focus</p>
                            <p className="merchandise_card_price">$ 44</p>
                            <button className="merchandise_buy_button">Buy Now</button>
                        </div>
                    </div>
                </div>

                <div className="merchandise_notice">
                    <p className="merchandise_notice_text"><i className="fas fa-exclamation-triangle"></i> Planned initial t-shirt designs at display.</p>
                    <p className="merchandise_notice_text_2"><i className="fas fa-tags"></i> Products Launching Soon. Stay Tuned</p>

                </div>
            </div>
            </Fade>
        </div>
    )
}

export default Merchandise
