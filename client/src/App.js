import Particles from "react-tsparticles";
import React, {useEffect} from 'react';  
import {BrowserRouter as Router} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
//Below are action creators which are fed to reducres (reducers make change to the overall state when actions are dispatched)
import {dispatchLogin, fetchUser, fetchDaysAccessed, dispatchGetDays, fetchAllPomodoros, dispatchGetPomodoros, dispatchGetUser, getTokenValue} from './redux/actions/authAction' 
//The above are the dispatching actions -> which get fed to reducers and change the respective store data

import Header from './components/header/Header'
import Body from './components/body/Body'
import axios from 'axios'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  const dispatch = useDispatch() //dispatch is ued to create an action and feed it to reducer
  const token = useSelector(state => state.token) //initially there is no token
  const auth = useSelector(state => state.auth) //initially there is no auth

  useEffect(() => {
    //If the user has logged into the app
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin)
    {
      //We get the refresh token and add it to state
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null) //returns token that can be then used to get our information
        dispatch(getTokenValue(res)) // takes the token and adds into state
      }
      getToken()
    }
  }, [auth.isLogged, dispatch]) //runs at initial render and after each time data is changed

  useEffect(() => {
    //Now we have the token in the state and to get the user data we need the token
    if(token) {
      const getUser = () => {
        //TODO - I just commented this function i think no need
        dispatch(dispatchLogin())

        //Here the user data is added to the state
        return fetchUser(token).then(res => { //fetchUser gets the details of the user logged in
          dispatch(dispatchGetUser(res)) //dispatchGetUser adds user to state and adds isAdmin
        })
      }


      const getPomodoros = () => {
        return fetchAllPomodoros(token).then(res => {
          dispatch(dispatchGetPomodoros(res.data))
        })
      }


      const daysAccessed = () => {
        return fetchDaysAccessed(token).then(res => {
          dispatch(dispatchGetDays(res.data))
        })
      }
      getUser() //makes user data available in state
      getPomodoros(); //makes pomodoro data related to user be available as state
      daysAccessed();
    }
  }, [token, dispatch])


  return (
    <Router>
    <div className="App">
      <Header />
      <Body />
    </div>
    </Router>
  );
}

export default App;
