import React, {useState, useEffect} from 'react'
import DatePicker from 'sassy-datepicker';
import './Detailed_Statistics.css'
import axios from 'axios'
import {useSelector} from 'react-redux'

import 'react-circular-progressbar/dist/styles.css';
import {Bar} from 'react-chartjs-2';

import { Chart, registerables} from 'chart.js';

import Fade from 'react-reveal/Fade';
import { showErrMsg, showSuccessMsg } from '../utils/notification/Notification'


Chart.register(...registerables);

const initStreak = {
    data: []
}

const initMonthlyData = {
    data: []
}

const initialState = {
    err: '',
    success: ''
}

const dataChart = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
    datasets: [
      {
        label: 'Monthly Time',
        backgroundColor: 'rgba(247, 21, 0)',
        borderColor: 'rgba(130, 13, 1)',
        borderWidth: 2,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
}

function Detailed_Statistics() {
    const token = useSelector(state => state.token)
    const [dataSelected, setDataSelected] = useState(initStreak)
    const [monthlyData, setMonthlyData] = useState(initMonthlyData)
    const [chartData, setChartData] = useState(dataChart)
    const [execData, setExecData] = useState(initialState);
    const {err, success} = execData;

    useEffect(() => {
        getMonthlyData();
    }, [])


    const getMonthlyData = async () => {
        try {
            const data = await axios.get(`/user/monthly_data`, {
                headers: {Authorization: token}
            })

            setMonthlyData(data.data)
            let monthsArray= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            
            if(data.data.length > 0 )
            {
                data.data.map((elem) => {
                    monthsArray[elem._id.month - 1] = elem.total_in_month;
                })
                setChartData((prevData) => ({...prevData, datasets: [{...prevData.datasets[0], data: monthsArray}]}))
            }
        } catch (err) {
            setExecData({...execData, err: 'An error occured when we were fetching your data.'})
        }
    }

    const onChange = async (date) => {
        const dateval = new Date(date).getDate();
        const month = new Date(date).getMonth();
        const full_year = new Date(date).getFullYear();

        const data = await axios.get(`/user/detailed_stats/${dateval}-${month}-${full_year}`, {
            headers: {Authorization: token}
        })
        setDataSelected(data.data)
        getMonthlyData();
    };


    const SessionCount = `${(dataSelected.length) > 0 ? dataSelected.length : 'You have not completed any sessions on this day'}`
    let AverageSessionTime = 0;
    let TotalSessionTime = 0;

    if(dataSelected.length > 0)
    {
        dataSelected.map((elem) => {
            AverageSessionTime+= elem.sessiontime;
        })
        TotalSessionTime = AverageSessionTime;
        AverageSessionTime = AverageSessionTime / dataSelected.length;
    }
    
    return (
        <React.Fragment>
         <div id="section_main" className="home_container">
                <h2 className="user_heading header_default">DETAILED STATISTICS</h2>
                <Fade bottom>
                {!execData.err ? <>
                <div className="detail_stats_container detail_stats_flex">
                    <div className="detail_stats_left">
                        <h2 className="detail_stats_text">Select the Date you need data on</h2>
                        <DatePicker onChange={onChange} />
                    </div>
                    <div className="detail_stats_right">
                        <div className="time_detail_container">
                            <h2 className="detail_container_heading">Total Sessions</h2>
                            <div className="text_v"><span className="small_just_text">{SessionCount}</span></div>
                        </div>

                        <div className="time_detail_container">
                            <h2 className="detail_container_heading">Average Time</h2>
                            <div className="text_v"><span className="small_just_text">{AverageSessionTime > 0 ? `${AverageSessionTime.toFixed(1)} mins / session` : 'Nill'}</span></div>
                        </div>

                        <div className="time_detail_container">
                            <h2 className="detail_container_heading">Total Time</h2>
                            <div className="text_v"><span className="small_just_text">{TotalSessionTime > 0 ? `${TotalSessionTime} mins` : 'Nill'} </span></div>
                        </div>

                        <div className="time_detail_container">
                            <h2 className="detail_container_heading">Monthly Time</h2>
                            <div className="text_v"><span className="small_just_text">{monthlyData.length > 0 ?  monthlyData[0].total_in_month : 'No data'} </span></div>
                        </div>
                    </div>

                </div>
                <div className="bar_container" style={{overflowX: "auto"}}>
                    <h2 className="user_heading header_default premium_heading_inside">Premium Feature</h2>
                    <h2 className="premium_heading_inside_sub">Available to first 100 registered users for 1 month</h2>
                    <Bar
                        data={chartData}
                        options={{
                            title:{
                            display:true,
                            text:'Average Rainfall per month',
                            fontSize:20
                            },
                            legend:{
                            display:true,
                            position:'right'
                            }
                        }}
                    />
                </div></> : <>{err && showErrMsg(err)}</>}
                </Fade>
                
          </div>   
        </React.Fragment>
    )
}

export default Detailed_Statistics
