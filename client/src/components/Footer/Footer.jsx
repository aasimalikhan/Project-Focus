import {Link} from 'react-router-dom'

function Footer() {
    const year = new Date().getFullYear();
    return (
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
    )
}

export default Footer;