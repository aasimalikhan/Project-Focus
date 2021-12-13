import React, {useState, useEffect} from 'react'
import MuteToggle from '../MuteToggle/mutetoggle'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import useSound from 'use-sound'
import startSfx from '../../sounds/startTimer.mp3'
import pauseSfx from '../../sounds/pauseTimer.mp3'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Prompt
} from "react-router-dom";

const TimerDisplay = ({ timerMode,
                        percentage,
                        timeLeft,
                        isActive,
                        setIsActive,
                        buttonText,
                        setButtonText,
                        volume,
                        setVolume,
                        pomStarted, 
                        setPomStarted
                      }) => {
                      

  const [play] = useSound(startSfx, {
                                      interrupt: true,
                                      volume: volume,
                                    })
  const [pause] = useSound(pauseSfx, {
                                      interupt: true,
                                      volume: volume,
                                    })
  // const [pomStarted, setPomStarted] = useState(false);

  // useEffect(() => {
  //   window.addEventListener('beforeunload', alertUser)
  //   window.addEventListener('unload', handleEndConcert)
  //   return () => {
  //     window.removeEventListener('beforeunload', alertUser)
  //     window.removeEventListener('unload', handleEndConcert)
  //     handleEndConcert()
  //   }
  // }, [])
  const alertUser = e => {
    e.preventDefault()
    e.returnValue = 'OP Level'
  }
  const handleEndConcert = async () => {
    // await fetcher({
    //   url: endConcert(concert.id),
    //   method: 'PUT'
    // })
  }

  const handleClick = (event) => {
    if (event.target.id === 'muteButton') {
      return null
    }

    if(!pomStarted)
    {
      setPomStarted(true);
      
    }
    
    if (timeLeft === '0:00') {

      return null
    }

    if (isActive) {
      pause()
    }
    else {
      play()
    }
    setIsActive(!isActive)
    setButtonText( buttonText === 'START'
                    || buttonText === 'RESUME'
                      ? 'PAUSE'
                      : 'RESUME'
                  )


    
  }

  let timesUpMsg = timerMode === 'pomo'
                  ? 'time for a break'
                  : 'back to work!'

  let timeText = timeLeft === '0:00'
                  ? timesUpMsg
                  : timeLeft

  let textSize = timeLeft === '0:00'
                  ? '12px'
                  : '28px'

  return(
    <div className="timer" onClick={handleClick}>
      <Prompt
        when={pomStarted}
        message=
          "The Pomodoro Timer is currently running. You will lose your current session data op."
      />

      {/* <Prompt
        when={pomStarted}
        message={() => "Are you sure you want to leave nigga?"}
      /> */}
      
      {/* <Prompt
        when}
        message={() => 'Are you sure you want to leave this page?'}
      /> */}
      {/* <Prompt
        when={isActive}
        message=
          "The Pomodoro Timer is currently running. You will lose your current session data."
      /> */}
      <div className="timer__display">
        <CircularProgressbarWithChildren
          value={percentage}
          text={timeText}
          strokeWidth={4}
          styles={buildStyles({
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
            // Colors & Fonts
            pathColor: 'var(--accent-color)',
            textColor: 'var(--text)',
            textSize: textSize,
            fontFamily: 'var(--font-current)',
            trailColor: 'none',
          })}>
          
          <MuteToggle volume = {volume}
                      setVolume = {setVolume} />
          <button className="display__start-pause" onClick={handleClick}>{buttonText}</button>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  )
}

export default TimerDisplay