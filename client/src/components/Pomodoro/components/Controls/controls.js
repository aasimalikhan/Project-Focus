import React, {useState} from 'react'
import useSound from 'use-sound'
import clickSfx from '../../sounds/slide.mp3'
import axios from 'axios'
import {useSelector} from 'react-redux' //to get state
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Prompt
} from "react-router-dom";

const initialState = {
  email: '',
  sessiontime: 0,
  date: new Date().toISOString(),
  err: '',
  success: ''
}


const Controls = ({ timerMode,
                    isActive,
                    setTimerMode,
                    secondsLeft,
                    setSecondsLeft,
                    pomoLength,
                    shortLength,
                    longLength,
                    setIsActive,
                    buttonText,
                    setButtonText,
                    setPomStarted,
                    pomStarted,
                    volume
                  }) => {

  const [playSfx] = useSound(clickSfx, { volume: volume });
  const [currentlyRunning, setCurrentlyRunning] = useState(false);
  const [ pomodata, setPomoData] = useState(initialState);
  const auth = useSelector(state => state.auth) //making the redux state be available inside the component
  const {user, isLogged} = auth;
  

  const addPomodoroData = async (email, sessiontime, date) => {
    try {
      const res = await axios.post('/user/add_session', {email, sessiontime, date})
    } catch(err) {
      err.response.data.msg &&
      setPomoData({...pomodata, err: err.response.data.msg, success: ''})
    }

  }

  const handleModeChange = (event) => {
    if(!isActive && !(buttonText === 'RESUME' || buttonText === ' PAUSE'))
    {
      if(isActive){
        
      }
      setTimerMode(event.target.id)
      setIsActive(false)
      setButtonText('START')
      setPomStarted(false)
      switch(event.target.id) {
        case 'short':
          setSecondsLeft(shortLength * 60)
          break
        case 'long':
          setSecondsLeft(longLength * 60)
          break
        default:
          setSecondsLeft(pomoLength * 60)
      }
    }
    else
    {
      if(window.confirm("The Timer is currently running, Are you sure you want to switch?"))
      {
        addPomodoroData(user.email,Math.ceil((pomoLength*60 - secondsLeft)/60), new Date().toISOString());
        setTimerMode(event.target.id)
        setIsActive(false)
        setButtonText('START')
        setPomStarted(false)
        switch(event.target.id) {
          case 'short':
            setSecondsLeft(shortLength * 60)
            break
          case 'long':
            setSecondsLeft(longLength * 60)
            break
          default:
            setSecondsLeft(pomoLength * 60)
        }
      }
    }

  }
  

  return(
    <form className="controls">
      {/* <Prompt
        when={currentlyRunning}
        message=
          "The Pomodoro Timer is currently running. You will lose your current session data."
      /> */}
      <input  type="radio" 
              id="pomo" 
              name="mode" 
              checked={timerMode === 'pomo'}
              onClick={playSfx} 
              onChange={handleModeChange} />
      <label  htmlFor="pomo" className="controls__button">pomodoro</label>

      <input  type="radio" 
              id="short" 
              name="mode" 
              checked={timerMode === 'short'}
              onClick={playSfx} 
              onChange={handleModeChange} />
      <label htmlFor="short"  className="controls__button">short break</label>
      
      <input  type="radio" 
              id="long" 
              name="mode" 
              checked={timerMode === 'long'}
              onClick={playSfx} 
              onChange={handleModeChange} />
      <label htmlFor="long"  className="controls__button">long break</label>
    </form>
  )
}

export default Controls