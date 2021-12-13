import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import TodoList from '../../../Tasks/TodoList/TodoList'
import { summary } from 'date-streaks';
import {Link} from 'react-router-dom'
//ChartJS Imports
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Fade from 'react-reveal/Fade';
import Loader from "react-loader-spinner";


// import {streaker} from 'streaker-js'

import badgesBr from '../../../images/bronze.png'
import badgesSi from '../../../images/silver.png'
import badgesGo from '../../../images/gold.png'
import { showErrMsg } from '../../../utils/notification/Notification';


ChartJS.register(ArcElement, Tooltip, Legend);
// import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'

const initStreak = {
    currentStreak: 0,
    latestStreak: 0,
    daysAccessed: 0,
}

const initialState = {
    err: '',
    success: ''
}

function PomodoroData() {
    // const [daysAccessed, setDaysAccessed] = useState(0);
    const [streakData, setStreakData] = useState(initStreak)
    const pomodoros = useSelector(state => state.pomodoro)
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const users = useSelector(state => state.users)
    const daysAccessedData = useSelector(state => state.data)
    const [execData, setExecData] = useState(initialState);
    const {err, success} = execData;

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const {user, isAdmin, isLogged} = auth;

    var today = new Date();
    const today_date = today.getDate();
    const today_year = today.getFullYear();
    const today_month = today.getMonth();

    //Helper Variables for stats
    // TODO; implement in aggregation (database)
    let sum_of_minutes_today = 0;
    let sum_of_total_minutes_studied = 0;
    let total_session_completed = 0;
    let total_session_completed_45 = 0;
    let badgeBronze = false;
    let badgeSilver = false;
    let badgeGold = false;
    let badge_count = 0;
    // let total_session_completed_gold = 0;

    useEffect(() => {
        getDays()
    }, [daysAccessedData])

    pomodoros.map(pomodoro => {
        total_session_completed++;
        if(pomodoro.sessiontime >= 1)
        {
            total_session_completed_45++;
        }
        sum_of_total_minutes_studied += pomodoro.sessiontime;
        if(new Date(pomodoro.date).getDate() === today_date && new Date(pomodoro.date).getMonth() === today_month && new Date(pomodoro.date).getFullYear() === today_year)
        {
            sum_of_minutes_today+=pomodoro.sessiontime;
        }
    })

    //Badge Calculator
    if(total_session_completed >= 10)
    {
        badgeBronze = true;
        badge_count++;
    }
    if(total_session_completed_45 >= 20)
    {
        badgeSilver = true;
        badge_count++;
    }
    if(total_session_completed_45 >= 40)
    {
        badgeGold = true;
        badge_count++;
    }

    const formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    function timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return [String(rhours).padStart(2, '0'), String(rminutes).padStart(2,'0')]
    }

    const getDays = async () => {
        try {
            const ans = daysAccessedData.map((el) => {
                if(typeof el._id === 'object')
                {
                    return el._id
                }
                else
                {
                const dateStr = el._id
                const year        = dateStr.toString().substring(0,4);
                const month       = dateStr.toString().substring(4,6);
                const day         = dateStr.toString().substring(6,8);
                const date        = new Date(year, month-1, day);
                el._id = date;
                return el._id
                }
            })

            const streaks_data = summary(ans) 
            setStreakData({...data, currentStreak: streaks_data.currentStreak, longestStreak: streaks_data.longestStreak, daysAccessed: daysAccessedData.length})
        } catch (err) {
            setExecData({...execData, err: 'An error occured when we are fetching data.'})
        }
    }

    const data = {
        labels: ['Focus', 'Other Stuff'],
        datasets: [
          {
            label: '# of Minutes',
            data: [sum_of_minutes_today, 12*60 - sum_of_minutes_today ], //instead of a particular set time (I am planning to set a daily goal, this daily goal thing makes the application more complex)
            backgroundColor: [
                'rgba(255, 74, 3, 0.5)',
              'rgba(125, 3, 255, 0.5)',
            ],
            borderColor: [
                'rgba(255, 74, 3, 1)',
              'rgba(125, 3, 255, 1)',
            ],
            borderWidth: 2,
          },
        ],
    };

    return (
        <>
        <Fade bottom>
        {isLogged ? 
        <div className="profile_page pomodata_section">
            <div className="col-right">
                <h2 className="user_heading margin-btm-high">Pomodoro Sessions</h2>
                <div className="container_tasks text-center">
                    <h2>Your Session Data</h2>
                    {!execData.err ? 
                    
                    <table className="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Pomodoro Length</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            pomodoros.length > 0 ? 
                            pomodoros.map(pomodoro => (
                                <tr key={pomodoro._id}>
                                    <td>{months[new Date(pomodoro.date).getMonth()]} {new Date(pomodoro.date).getDate()}, {new Date(pomodoro.date).getFullYear()}</td>
                                    <td>{formatAMPM(new Date(pomodoro.date))}</td>
                                    <td>{pomodoro.sessiontime} min</td>
                                </tr>
                            )) : <h2 className="session_empty">You have not completed any sessions</h2>
                    } 
                    </tbody>
                    </table> : <>{err && showErrMsg(err)}</> }
        
                </div>
            </div>
        </div> : <></>}

        {isLogged ? 
        <>
        <div className="profile_page pomodata_section">
            <div className="col-right">
                <h2 className="user_heading margin-btm-high">Today Stats</h2>
                <div className="pie_container" style={{overflowX: "auto"}}>
                    <Pie className="pie_data" data={data} />;
                </div>
            </div>
        </div> 

        <div className="profile_page pomodata_section">
            <div className="col-right">
                <h2 className="user_heading margin-btm-high">YOUR STATISTICS</h2>
                <div className="section_spread">
                    <div className="time_display_container">
                        <h2 className="display_container_heading">Time Spent</h2>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                <th className="small_table_text" scope="col">Hours</th>
                                <th className="small_table_text" scope="col">Minutes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="small_table_text_val">{timeConvert(sum_of_total_minutes_studied)[0]}</td>
                                    <td className="small_table_text_val">{timeConvert(sum_of_total_minutes_studied)[1]}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="time_display_container">
                        <h2 className="display_container_heading">Days Accessed</h2>
                        <div className="text_v"><span className="just_text">{streakData.daysAccessed}</span></div>
                   
                    </div>

                    <div className="time_display_container">
                        <h2 className="display_container_heading">Current Streak</h2>
                        <div className="text_v"><span className="just_text">{streakData.currentStreak}</span></div>
                   
                    </div>

                    <div className="time_display_container">
                        <h2 className="display_container_heading">Longest Streak</h2>
                        <div className="text_v"><span className="just_text">{streakData.longestStreak}</span></div>
                   
                    </div>
                </div>
                <div className="single_button">
                    <Link to="detailed_statistics" className="header_btn third header_link_btn">Detailed Statistics</Link>
                </div>
            </div>
        </div></> : <></> }


        {isLogged ? 
        <div className="profile_page pomodata_section">
            
            <div className="col-right">
                <h2 className="user_heading margin-btm-high">Badges <Link to="/badge_details"><i className="fas fa-external-link-alt"></i></Link></h2>
                {badge_count > 0 ?
                <div className="badges_container">
                    {badgeBronze ? <div className="badge_card">
                        <img className="badge_icon" src={badgesBr} alt="bronze_badge"/>
                        <p className="badge_card_name">Bronze</p>
                    </div> : <></>}

                    {badgeSilver ? <div className="badge_card">
                        <img className="badge_icon" src={badgesSi} alt="silver_badge"/>
                        <p className="badge_card_name">Silver</p>
                    </div> : <></>}

                    {badgeGold ? <div className="badge_card">
                        <img className="badge_icon" src={badgesGo} alt="silver_badge"/>
                        <p className="badge_card_name">Gold</p>
                    </div> : <></>}
                </div>  : <p className="badge_notice">You have no badges</p>}
            </div>
        </div> : <></> }
        </Fade>
        </>
    )
}


export default PomodoroData;
