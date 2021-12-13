import React, {useState} from 'react'
import useSound from 'use-sound'
import clickSfx from '../../sounds/slide.mp3'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Prompt
} from "react-router-dom";

const Controls = ({ timerMode,
                    isActive,
                    setTimerMode,
                    setSecondsLeft,
                    pomoLength,
                    shortLength,
                    longLength,
                    setIsActive,
                    buttonText,
                    setButtonText,
                    volume
                  }) => {

  const [playSfx] = useSound(clickSfx, { volume: volume });
  const [currentlyRunning, setCurrentlyRunning] = useState(false)

  const handleModeChange = (event) => {
    if(!isActive && !(buttonText === 'RESUME' || buttonText === ' PAUSE'))
    {
      if(isActive){
        
      }
      setTimerMode(event.target.id)
      setIsActive(false)
      setButtonText('START')
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
        setTimerMode(event.target.id)
        setIsActive(false)
        setButtonText('START')
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
      <Prompt
        when={currentlyRunning}
        message=
          "The Pomodoro Timer is currently running. You will lose your current session data."
      />
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