import './Pomodoro.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Prompt
} from "react-router-dom";

import Header from './components/Header/header'
import Controls from './components/Controls/controls'
import TimerDisplay from './components/TimerDisplay/timerdisplay'
import PomodoroData from './components/PomodoroData/PomodoroData'
import Button from './components/Button/button'
import Settings from './components/Settings/settings'
import { useState, useEffect } from 'react';
import useSound from 'use-sound'
import timesUpSfx from './sounds/timesUp.mp3'
import Progress from 'react-progressbar';
import {useSelector} from 'react-redux' //to get state
import axios from 'axios'
import Fade from 'react-reveal/Fade';

const initialState = {
  email: '',
  sessiontime: 0,
  date: new Date().toISOString(),
  err: '',
  success: ''
}

function App() {
  const [ settingsVisible, setSettingsVisible ] = useState(false)
  const [ timerMode, setTimerMode ] = useState('pomo')   // options: pomo, short, long
  const [ pomoLength, setPomoLength ] = useState(25)
  const [ shortLength, setShortLength ] = useState(3)
  const [ longLength, setLongLength ] = useState(15)
  const [ fontPref, setFontPref ] = useState('kumbh')         // options: kumbh, roboto, space
  const [ accentColor, setAccentColor ] = useState('default') // options: default, blue, purple
  const [ secondsLeft, setSecondsLeft] = useState(pomoLength * 60)
  const [ isActive, setIsActive ] = useState(false)
  const [ buttonText, setButtonText ] = useState('START')
  const [pomStarted, setPomStarted] = useState(false)
  // const [ pomStarted, setPomStarted] = useState(false)
  const [ pomodata, setPomoData] = useState(initialState)
  const auth = useSelector(state => state.auth) //making the redux state be available inside the component
  const pomodoros = useSelector(state => state.pomodoro)
  const [ volume, setVolume ] = useState(1)
  const [ timesUp ] = useSound(timesUpSfx, {
                                volume: volume,
                              })
                              
  const {user, isLogged} = auth;
  const pomodoroSessions = auth.user.PomodoroSessions;
  

  // if(buttonText === 'RESUME' || buttonText === 'PAUSE')
  // {
  //   setPomStarted(true)
  // }
  // console.log(pomodoroSessions)


  const addPomodoroData = async (email, sessiontime, date) => {
    try {
      const res = await axios.post('/user/add_session', {email, sessiontime, date})
    } catch(err) {
      err.response.data.msg &&
      setPomoData({...pomodata, err: err.response.data.msg, success: ''})
    }

  }
  
  useEffect(() => {
    if (isActive) {
      // Store the start time and remaining seconds when timer is activated
      const startTime = Date.now();
      const initialSecondsRemaining = secondsLeft;
      
      const interval = setInterval(() => {
        // Calculate elapsed time since interval started
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        const newRemainingSeconds = initialSecondsRemaining - elapsedSeconds;
        
        // Update timer with the actual elapsed time
        if (newRemainingSeconds <= 0) {
          // Timer finished
          setSecondsLeft(0);
          clearInterval(interval);
          setIsActive(false);
          setButtonText('');
          
          // Handle timer completion
          if (timerMode === 'pomo' && isLogged) {
            addPomodoroData(user.email, pomoLength, new Date().toISOString());
          }
          
          timesUp();
        } else {
          setSecondsLeft(newRemainingSeconds);
        }
      }, 250); // Poll more frequently for smoother updates, but use real elapsed time
  
      return () => clearInterval(interval);
    }
  }, [isActive, timerMode, pomoLength, isLogged, user, timesUp]);

  const toggleSettingsVisibility = (event) => {
    setSettingsVisible(!settingsVisible)
  }

  const formatTimeLeft = (seconds) => {
    return(`${Math.floor(seconds / 60)}:${
            (seconds % 60 > 9)
              ? seconds % 60
              : '0' + seconds % 60
          }`)
  }

  const calcPercentage = () => {
    if(timerMode === 'pomo') {
      return((secondsLeft / (pomoLength * 60)) * 100)
    }
    if(timerMode === 'short') {
      return((secondsLeft / (shortLength * 60)) * 100)
    }
    if(timerMode === 'long') {
      return((secondsLeft / (longLength * 60)) * 100)
    }
    
  }

  return (
    <>
    
    <div className="pomodoro-app">
      
      {/* Displays title of the Application */}
      
      <Fade bottom>
      <Progress completed={75} />
      
      <Header title="pomodoro" /> 
      

      {/* Controls basically has the 3 buttons for different modes
      (pomodoro, shot break, long break)
      Based on the button selected the time will be reset and text inside the timer
      will be changed (START) */}
      <Controls
        timerMode={timerMode} 
        setTimerMode={setTimerMode}
        secondsLeft={secondsLeft}
        setSecondsLeft={setSecondsLeft}
        buttonText={buttonText}
        isActive={isActive}
        pomoLength={pomoLength}
        shortLength={shortLength}
        longLength={longLength}
        setIsActive={setIsActive}
        setButtonText={setButtonText}
        volume={volume}
        pomStarted={pomStarted}
        setPomStarted={setPomStarted}
        />
      <TimerDisplay
        timerMode={timerMode}
        percentage={calcPercentage()}
        timeLeft={formatTimeLeft(secondsLeft)}
        isActive={isActive}
        setIsActive={setIsActive}
        buttonText={buttonText}
        setButtonText={setButtonText}
        volume={volume}
        setVolume={setVolume}
        pomStarted={pomStarted}
        setPomStarted={setPomStarted}
        />
      <Button type="settings" toggleVisibility={toggleSettingsVisibility} />
      </Fade>
      <Settings visible={settingsVisible}
                isActive={isActive}
                toggleSettingsVisibility={toggleSettingsVisibility} 
                buttonText={buttonText}
                pomoLength={pomoLength}
                setPomoLength={setPomoLength}
                shortLength={shortLength}
                setShortLength={setShortLength}
                longLength={longLength}
                setLongLength={setLongLength}
                fontPref={fontPref}
                setFontPref={setFontPref}
                accentColor={accentColor}
                setAccentColor={setAccentColor}
                closeSettings={toggleSettingsVisibility}
                setSecondsLeft={setSecondsLeft}
                timerMode={timerMode}
                pomStarted={pomStarted}
                setPomStarted={setPomStarted}
                />
              
    </div>
    <PomodoroData/>
    </>
  );
}

export default App;