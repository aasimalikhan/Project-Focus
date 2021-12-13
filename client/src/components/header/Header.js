import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import logo from '../images/logo_pf.png'
import axios from 'axios'
import {Dropdown} from 'react-bootstrap'

function Header() {
    const auth = useSelector(state => state.auth)

    const handleLogout = async (e) => {
        // try {
            if(window.confirm("Are you sure you want to log out?"))
            {
                e.preventDefault();
                await axios.get('/user/logout')
                localStorage.removeItem('firstLogin')
                window.location.href = "/";
                return true;
            }
            else
            {
                e.preventDefault();
                return false;
                // window.location.href = window.location.href
            }
        // } catch (err) {
        //     window.location.href = "/";
        // }
    }

    const { user, isLogged, isAdmin } = auth
    const userLink = () => {
        return <>
            <li><Link className="header_btn_yell third_yell header_link_btn" to="/get_announcements"><i className="fa fa-bell fa-lg"></i></Link></li>
            <li><Link className="header_btn_yell third_yell header_link_btn" to="/challenge_details"><i className="fa fa-trophy fa-lg"></i></Link></li>

            <li className="drop-nav">
                <Link to='/profile' className="avatar">
                    <img src={user.avatar} alt="" />{user.name} 
                </Link>
            </li>
            <li><Link className="header_btn_yell third_bl header_btn_profile" to="/profile"><i className="fa fa-id-card fa-2x"></i></Link></li>
            <li><Link className="header_btn_bl third_bl header_btn_profile" to="/" onClick={handleLogout}><i className="fa fa-sign-out-alt fa-2x"></i></Link></li></>
    }

    return (
        <>
            <header>
                <div className="logo">
                    <h1 className="logo_name"><Link to="/"><img alt="logo_project_focus" className="logo_main" src={logo}></img></Link></h1>
                </div>

                <ul classList="list_nav header_list">
                    <li><Link className="header_btn third header_link_btn" to="/studywith"><i className="fa fa_r fa-graduation-cap "></i>Study with</Link></li>
                    <li><Link className="header_btn third header_link_btn" to="/pomodoro"><i className="fa fa_r fa-clock"></i> Pomodoro</Link></li>
                    <li><Link className="header_btn third header_link_btn" to="/tasks"><i className="fa fa_r fa-clipboard-check"></i> Todo</Link></li>
                    <li><Link className="header_btn third header_link_btn" to="/resources"><i className="fa fa_r fa-inbox "></i> Resources</Link></li>
                    <li><Link className="header_btn third header_link_btn" to="/get_leaderboard"><i className="fa fa_r fa-chart-bar "></i> LeaderBoard</Link></li>
                    {isAdmin ? <li><Link className="header_btn third header_link_btn" to="/make_announcement"><i className="fa fa_r fa-chart-bar "></i>Announcement</Link></li> : <></>}
                    <li>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                MORE
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item><Link className="black_color_text" to="/merchandise">Merchandise</Link></Dropdown.Item>
                                { isAdmin ? <Dropdown.Item><Link className="black_color_text" to="/get_issues">Issues</Link></Dropdown.Item> : <></> }
                                <Dropdown.Item><Link className="black_color_text" to="/premium">PREMIUM</Link></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>

                <ul classList="list_main">
                    {
                        isLogged //show the sign in button only if the user is not logged in, else show it
                            ? userLink() // if the user is logged then we have his/her data in the state, so we extract it and show it
                            : <li><Link className="header_btn header_main_btn header_link_btn" to="/login"><i className="fa fa-user-astronaut fa-lg"></i> Sign in</Link></li>
                    }
                </ul>
            </header>
            <div className="seperator gradient">
            </div>
        </>
    )
}

export default Header
